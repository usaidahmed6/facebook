import './App.css';
import './styles/responsive.css'
import { Routes, Route } from "react-router-dom";
import Authentication from './screens/Authentication';
import MyNavbar from './components/Navbar';
import HomeBody from './components/HomeBody';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeBody />} />
        <Route path="/login-signup" element={<Authentication />} />
      </Routes>
    </>

  );
}

export default App;
