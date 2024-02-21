import React from 'react'
import {Link} from 'react-router-dom'
const NotFound = () => {
	return (
		<div className="not_found">
			<h1>404</h1>
			<h3>page not found</h3>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
			<Link to="/" className="button outline">
				<span>go to home</span>
			</Link>
		</div>
	)
}

export default NotFound