import React from 'react'
import MyNavbar from './Navbar';
import cssHomeBody from '../styles/homeBody.module.css'
import LeftBar from './LeftBar';
import RightBar from './RightBar';
import HomeCenterContent from './HomeCenterContent';

const HomeBody = () => {
    return (
        <>
            <MyNavbar />

            <div className={cssHomeBody.container}>
                <LeftBar />
                <HomeCenterContent />
                <RightBar />
            </div>
        </>
    )
}

export default HomeBody
