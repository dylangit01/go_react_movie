import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Admin extends Component {
	state = {
		movies: [],
		isLoading: true,
		error: null,
	};

	fetchAllMovies = () => {
		fetch('http://localhost:4000/v1/movies')
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
						movies: data.movies,
						isLoading: false,
					},
					(error) => this.setState({ isLoading: false, error })
				);
			});
	};

	componentDidMount() {
		this.fetchAllMovies();
	}

	render() {
		const { movies, isLoading, error } = this.state;
		if (error) return <h3>Error: {error.message}</h3>;

		return (
			<>
				{isLoading ? (
					<h3>Fetching Movies...</h3>
				) : (
					<>
						<h2>Manage Catalogue</h2>
						<div className='list-group'>
							{movies.map((movie) => (
								<Link key={movie.id} to={`/admin/movie/${movie.id}`} className='list-group-item list-group-item-action'>
									{movie.title}
								</Link>
							))}
						</div>
					</>
				)}
			</>
		);
	}
}

export default Admin
