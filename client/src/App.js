import './App.css';
import { Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css" 

import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/Home';
import YourProfile from './pages/YourProfile';
import Navbar from './pages/Navbar';
import NotFound from './pages/NotFound'

// import ToastTrial from './ToastTrial.js'
import Landing from './pages/Landing';
import UpdatedNavbar from './pages/UpdatedNavbar';
import UpdatedLogin from './pages/UpdatedLogin';
import UpdatedRegister from './pages/UpdatedRegister';
import BottomFooter from './pages/BottomFooter';
import SignUpTrial from './pages/SignUpTrial'
// import UpdatedMovieList from './pages/UpdatedMovieList';
import SignOut from './pages/Signout';
// import UpdatedModal from './pages/UpdatedModal';
// import { useNavigate } from 'react-router-dom'

function App() {

  // localStorage.clear();
  // const navigate = useNavigate();
  // navigate('/login');
  return (
    <>
    <div className="App min-h-screen">
        {/* <h1>Hello world</h1> */}

        {/* <Navbar></Navbar> */}
        
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path="" element={<UpdatedNavbar/>}>
            <Route path="/register" element={<UpdatedRegister />}/>
            <Route path="/login" element={<UpdatedLogin />}/>
            <Route path="/home/" element={<Home />}/>
            <Route path="/profile" element={<YourProfile />}/>
            <Route path="signuptrial" element={<SignUpTrial />}/>
            <Route path="/signout" element={<SignOut/>}/>
            {/* <Route path="/modaltrial" element={<UpdatedModal/>}/> */}
            {/* <Route path="/updregister" element={<UpdatedRegister />}/> */}
            {/* <Route path="/updlogin" element={<UpdatedLogin />}/> */}
            {/* <Route path="trial" element={<ToastTrial />} /> */}
            <Route path="*" element={<NotFound />}/>
          </Route>
      </Routes>
    </div>
    {/* <BottomFooter/> */}
    </>
  );
}

export default App;