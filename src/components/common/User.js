import React from 'react'
import { Link } from "react-router-dom";
import * as Icons from "react-icons/tb";

const User = ({src,name,link,className}) => {
	return (
		<Link to={link} className={`user ${className ? className :''}`}>
			<figure>
				<img src={src} alt={src}/>
			</figure>
			<div className="name">{name}</div>
		</Link>
	)
}

export default User