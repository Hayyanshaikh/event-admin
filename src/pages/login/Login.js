import * as Icons from "react-icons/tb";
import React,{ useState, useEffect } from 'react';
import Input from '../../components/common/Input.js';
import Button from '../../components/common/Button.js'
import CheckBox from '../../components/common/CheckBox.js';
import Logo from "../../images/common/logo-dark.svg";
import { Routes, Route, useNavigate, Link } from 'react-router-dom';

const Login = ({isLogin}) => {
	// check user login or logout
	const [login, setLogin] = useState(false);
	const [loginError, setLoginError] = useState(false);
	const navigate = useNavigate();

  const [formData, setFormData] = useState({
	  email: "",
	  password: "",
	});
  // Function to handle input field changes
  const handleInputChange = (fieldName, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: newValue,
    }));
  };

  // check remember
  const [isRemember, setIsRemember] = useState(false);

  // Define a function to handle checkbox state changes
  const handleRememberChange = (check) => {
    setIsRemember(check);
  };

  const [show, setShow] = useState(false);
  // show password
  const handleShowPassword = () =>{
  	setShow(!show);
  }

  // login
  const handleLogin = (e) => {
  	e.preventDefault();
  	if (formData.email === "eventadmin@gmail.com" && formData.password === "eventadmin" && isRemember) {
    	setLogin(true);
  	}
  	else{
  		setLoginError(true)
  		setTimeout(()=>{
  			setLoginError(false)
  		},5000)
  	}
  };

  const hadnleGoogleLogin = () =>{
    	setLogin(true);
  }

  useEffect(() => {
    isLogin(login);

    if (login) {
      navigate("/");
    }
  }, [login, isLogin, navigate]);
	return (
		<div className="login">
			<div className="login_sidebar">
				<figure className="login_image">
					<img src="https://images.unsplash.com/photo-1694537745985-34eacdf76139?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" alt=""/>
				</figure>
			</div>
			<div className="login_form">
				<div className="login_content">
					{/*<h2 className="page_heading">Login</h2>*/}
					<div to="/" className="logo">
	          <img src={Logo} alt="logo" />
	        </div>
					<h2 className="page_heading">Login</h2>
				</div>		
				<form className="form" onSubmit={handleLogin}>
					<div className="form_control">
						<Input
	            type="text"
	            value={formData.email}
	            onChange={(value) =>
	              handleInputChange("email", value)
	            }
	            placeholder="Email or Phone Number"
	            icon={<Icons.TbUser/>}
	            label="Email or Number"
	            className={formData.email === "" ? "valid" : ""}
	          />
					</div>
					<div className="form_control">
						<Input
	            type={show ? "text" : "password"}
	            value={formData.password}
	            onChange={(value) =>
	              handleInputChange("password", value)
	            }
	            placeholder="Password"
	            icon={<Icons.TbEye/>}
	            onClick={handleShowPassword}
	            label="Password"
	            className={formData.password === "" ? "valid" : ""}
	          />
					</div>
					<div className="form_control">
						<CheckBox
			        id="exampleCheckbox"
			        label="Rememeber me"
			        checked={isRemember}
			        onChange={handleRememberChange}
			      />
					</div>
					{loginError ? <small className="incorrect">incorrect email or password and Remember me</small> : ""}
					<div className="form_control">
						<Button
			        label="Login"
			        type="submit"
			      />
					</div>	
				</form>
				<p className="singup_link">
					Don't have an account yet? <Link to="/signup">Join Metronic</Link>
				</p>
				<button onClick={hadnleGoogleLogin} className="google_signin">
					<figure>
						<img src="https://img.icons8.com/color/1000/google-logo.png" alt=""/>
					</figure>
					<h2>sign in with google</h2>
				</button>
			</div>
		</div>
	)
}

export default Login