import React, { useState } from 'react';
import '../styles/Auth.css';
import swal from 'sweetalert';
import { Form, Input, Modal, Radio, Button, Select, } from 'antd';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db, doc, setDoc } from '../config/firebase';


const { Option } = Select;

const Authentication = () => {
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const onFinish = (values) => {
        setLoader(true)
        const { email, password } = values;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                document.querySelector('.loginForm').reset()
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
                const errorCode = error.code;
                const errorMessage = error.message;
                swal("Oops", errorMessage, "error")
                // alert(errorMessage)
                console.log(errorMessage);
            });

    };
    // setLoader(false)
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setLoader(false)

    };
    return (
        <div className='AuthContainer'>
            <div className='leftDiv'>
                <h1 className='facebookHeading'>facebook</h1>
                <h5 className='facebookContent'>facebook helps you connect and share with the people in your life.</h5>
            </div>

            <div className='rightDiv'>
                <h1 className='facebookHeading dis-handle'>facebook</h1>

                <Form name="basic" className='loginForm' onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{ remember: true, }}>
                    <Form.Item

                        name="email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Please input your email ',
                            },
                        ]}
                    >
                        <Input placeholder='Email address' size='large' className='login-form-field' />
                    </Form.Item>

                    <Form.Item

                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password placeholder='Password' size='large' className='login-form-field' />
                    </Form.Item>



                    <Form.Item

                    >
                        <Button htmlType="submit" loading={loader} className='btn-submit-login login-form-field text-light' size='large'>
                            Log in
                        </Button>
                    </Form.Item>
                    <p className='text-primary my-3'>Forgotten password?</p>
                    <div className='bottom-border'></div>
                    <Button className='btn-signup' onClick={() => { setOpen(true); }} size="large">
                        Create New Account
                    </Button>
                    <SignUpform
                        open={open}
                        // onCreate={onCreate}
                        onCancel={() => {
                            setOpen(false);
                        }}
                    />
                </Form>

                <p className=' my-4 text-center para'>  <b>Create a Page </b>  for a celebrity, brand or business.</p>
            </div>

        </div>

    )
}
export default Authentication

const SignUpform = ({ open, onCancel }) => {

    const [form] = Form.useForm();
    const [radioBtnValue, setRadioBtnValue] = useState();
    const [dateOfBirthYear, setDateOfBirthYear] = useState();
    const [dateOfBirthDay, setDateOfBirthDay] = useState();
    const [dateOfBirthMonth, setDateOfBirthMonth] = useState();


    const onCreate = (values) => {
        const { email, firstName, password, surname } = values
        // console.log('usersignUp=> ', email, firstName, password, surname);
        // console.log('dateofBirth Day=======>', dateOfBirthYear);
        // console.log('dateofBirth Month=======>', dateOfBirthDay);
        // console.log('dateofBirth Year=======>', dateOfBirthMonth);
        // console.log('radio btn value========>', radioBtnValue)

        if (!email | !firstName | !password | !surname | !dateOfBirthYear | !dateOfBirthDay | !dateOfBirthMonth | !radioBtnValue) {
            console.log('nai howa ');
            swal("Oops", 'please fill out this fields', "error")

            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user);
                const uid = user.uid
                const obj = {
                    email,
                    firstName,
                    password,
                    surname,
                    dateOfBirthYear,
                    dateOfBirthDay,
                    dateOfBirthMonth,
                    radioBtnValue,
                    uid
                }
                await setDoc(doc(db, "users", uid), obj);
                swal("successfully sign up", 'user sign up successfully', "success")

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                swal("Oops", errorMessage, "error")

            });
    };

    const handleChangeDay = (value) => {
        setDateOfBirthDay(value);
    };

    const handleChangeMonth = (value) => {
        setDateOfBirthMonth(value)

    };

    const handleChangeYear = (value) => {
        setDateOfBirthYear(value)

    };


    const onChangeRadiobtn = (e) => {
        setRadioBtnValue(e.target.value);
    };
    return (
        <Modal
            className='SignUp-container'
            open={open}
            okText="Sign Up"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <div className='signup-div'>
                <h1 className='signup-heading'>Sign Up</h1>
                <p className='signup-para'>It's quick and easy.</p>
            </div>
            <Form
                className='signUpForm'
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}

            >
                <Form.Item className='signUpFormItems' name="firstName" rules={[{ required: true }]}>
                    <Input placeholder="First Name" className='FirstNameInput' size='large' />
                </Form.Item>

                <Form.Item className='signUpFormItems' name="surname" rules={[{ required: true }]}>
                    <Input placeholder="Surname" className='SurnameInput mx-2' size='large' />
                </Form.Item>

                <Form.Item className='my-2' name="email" rules={[{ required: true, type: 'email' }]} >
                    <Input placeholder="Email address" size='large' />
                </Form.Item>
                <Form.Item className='my-2' name="password" rules={[{ required: true, }]} >
                    <Input.Password placeholder="New password" size='large' />
                </Form.Item>

                <p className='paraDateofBirth'>Date of birth</p>

                <Select defaultValue="1" style={{ width: '32%', }} onChange={handleChangeDay} size='large'>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                    <Option value="9">9</Option>
                    <Option value="10">10</Option>
                    <Option value="11">11</Option>
                    <Option value="12">12</Option>
                    <Option value="13">13</Option>
                    <Option value="14">14</Option>
                    <Option value="15">15</Option>
                    <Option value="16">16</Option>
                    <Option value="17">17</Option>
                    <Option value="18">18</Option>
                    <Option value="19">19</Option>
                    <Option value="20">20</Option>
                    <Option value="21">21</Option>
                    <Option value="22">22</Option>
                    <Option value="23">23</Option>
                    <Option value="24">24</Option>
                    <Option value="25">25</Option>
                    <Option value="26">26</Option>
                    <Option value="27">27</Option>
                    <Option value="28">28</Option>
                    <Option value="29">29</Option>
                    <Option value="30">30</Option>
                </Select>


                <Select defaultValue="Nov" style={{ width: '32%', }} onChange={handleChangeMonth} className='mx-2' size='large'>
                    <Option value="Jan">Jan</Option>
                    <Option value="Fan">Feb</Option>
                    <Option value="Mar">Mar</Option>
                    <Option value="Apr">Apr</Option>
                    <Option value="May">May</Option>
                    <Option value="Jun">Jun</Option>
                    <Option value="Jul">Jul</Option>
                    <Option value="Aug">Aug</Option>
                    <Option value="Sep">Sep</Option>
                    <Option value="Oct">Oct</Option>
                    <Option value="Nov">Nov</Option>
                    <Option value="Dec">Dec</Option>

                </Select>

                <Select defaultValue="2022" style={{ width: '32%', }} onChange={handleChangeYear} size='large'>
                    <Option value="2022">2022</Option>
                    <Option value="2021">2021</Option>
                    <Option value="2020">2020</Option>
                    <Option value="2019">2019</Option>
                    <Option value="2018">2018</Option>
                    <Option value="2017">2017</Option>
                    <Option value="2016">2016</Option>
                    <Option value="2015">2015</Option>
                    <Option value="2014">2014</Option>
                    <Option value="2013">2013</Option>
                    <Option value="2012">2012</Option>
                    <Option value="2011">2011</Option>
                    <Option value="2010">2010</Option>
                    <Option value="2009">2009</Option>
                    <Option value="2008">2008</Option>
                    <Option value="2007">2007</Option>
                    <Option value="2006">2006</Option>
                    <Option value="2005">2005</Option>
                    <Option value="2004">2004</Option>
                    <Option value="2003">2003</Option>
                    <Option value="2002">2002</Option>
                    <Option value="2001">2001</Option>
                    <Option value="2000">2000</Option>
                    <Option value="1999">1999</Option>
                    <Option value="1998">1998</Option>
                    <Option value="1997">1997</Option>
                    <Option value="1996">1996</Option>
                    <Option value="1995">1995</Option>
                    <Option value="1994">1994</Option>
                    <Option value="1993">1993</Option>
                    <Option value="1992">1992</Option>
                    <Option value="1991">1991</Option>
                    <Option value="1990">1990</Option>

                </Select>
                <p className='paraGender'>Gender</p>
                <Radio.Group style={{ marginTop: 16, }} className="radio-gender" onChange={onChangeRadiobtn} value={radioBtnValue}>
                    <Radio value='Female' className='btn-radio mx-2'>Female</Radio>
                    <Radio value='Male' className='btn-radio mx-2'>Male</Radio>
                </Radio.Group>

            </Form>

        </Modal>
    );
};


