import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Movies extends Component {
	state = {
		movies: [],
		isLoading: true,
		error: null,
	};

	componentDidMount() {
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
	}

	render() {
		const { movies, isLoading, error } = this.state;
		if(error) return <h3>Error: {error.message}</h3>

		return (
			<>
				{isLoading ? (
					<h3>Fetching Movies...</h3>
				) : (
					<>
						<h2>Choose a movie</h2>
						<ul>
							{movies.map((movie) => (
								<li key={movie.id}>
									<Link to={`/movies/${movie.id}`}>{movie.title}</Link>
								</li>
							))}
						</ul>
					</>
				)}
			</>
		);
	}
}

export default Movies;
