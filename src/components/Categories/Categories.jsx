import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom';

const Categories = () => {

	// Get path and url from useRouteMatch method:
	const { path, url } = useRouteMatch();

	return (
		<div>
			<h2>Category</h2>
			<ul>
				<li><Link to={`${path}/comedy`}>Comedy</Link></li>
				<li><Link to={`${url}/drama`}>drama</Link></li>
			</ul>
		</div>
	)
}

export default Categories
