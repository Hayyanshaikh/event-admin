import React from 'react'
import { Link } from "react-router-dom";

const Profile = ({src,label,className,category,link}) => {
	return (
		<Link to={link} className={`product_profile`}>
			<figure>
				<img src={src} alt={src}/>
			</figure>
			<div className="product_profile_content">
				<span>{label}</span>
				{category ? <p>{category}</p> : ""}
			</div>
		</Link>
	)
}

export default Profile;