import React,{useState,useEffect} from 'react'
import Navbar from './Navbar.js'
import Main from './Main.js'
import Sidebar from './Sidebar.js'
import Footer from './Footer.js'
import { Routes, Route, useNavigate } from 'react-router-dom';

// login or logout
import Login from '../../pages/login/Login.js';
import Signup from '../../pages/login/Signup.js';

const Layout = () => {
	const [login, setLogin] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
    if (!login) {
      navigate("/login");
    }
    else{
      navigate("/");
    }
  }, [login]);

	const isLogin = (login)=>{
		setLogin(login)
	}

	
	return (
		<>
			{
				!login ? (
					<Routes>
						<Route path="/login" element={<Login isLogin={isLogin}/>}/>
						<Route path="/signup" element={<Signup isLogin={isLogin}/>}/>
					</Routes>
				) : (
					<>
						<Sidebar/>
						<div className="admin_body">
							<Navbar/>
							<Main/>
							<Footer/>
						</div>
					</>
				)
			}
			
		</>
	)
}

export default Layout;