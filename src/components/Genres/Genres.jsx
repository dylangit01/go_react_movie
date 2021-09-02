import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Genres extends Component {
	state = {
		genres: [],
		isLoading: true,
		error: null,
	};

	fetchAllGenres = () => {
		fetch('http://localhost:4000/v1/genres')
			.then((res) => {
				if (res.status !== '200') {
					const err = new Error();
					err.message = `Invalid response code: ${res.status}`;
					this.setState({ error: err });
				}
				return res.json();
			})
			.then((data) => {
				this.setState(
					{
						genres: data.genres,
						isLoading: false,
					},
					// error is optional argument
					(error) => this.setState({ isLoading: false, error })
				);
			});
	};

	componentDidMount() {
		this.fetchAllGenres();
	}

	render() {
		const { genres, isLoading, error } = this.state;

		if (error) return <h3>Error: {error.message}</h3>;

		return (
			<>
				{isLoading ? (
					<h3>Loading...</h3>
				) : (
					<>
						<h2>Genres</h2>
						<ul>
							{genres.map((genre) => (
								<li key={genre.id}>
									<Link to={`/genre/${genre.id}`}>{genre.genre_name}</Link>
								</li>
							))}
						</ul>
					</>
				)}
			</>
		);
	}
}

// import React from 'react'
// import { useRouteMatch, Link } from 'react-router-dom';

// const Genres = () => {

// 	// Get path and url from useRouteMatch method:
// 	const { path, url } = useRouteMatch();

// 	return (
// 		<div>
// 			<h2>Category</h2>
// 			<ul>
// 				<li><Link to={`${path}/comedy`}>Comedy</Link></li>
// 				<li><Link to={`${url}/drama`}>drama</Link></li>
// 			</ul>
// 		</div>
// 	)
// }

// export default Genres
