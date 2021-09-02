import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Movies extends Component {
	state = {
		movies: [],
		isLoading: true,
	};

	componentDidMount() {
		fetch('http://localhost:4000/v1/movies')
			.then((res) => res.json())
			.then((data) => {
				this.setState({
					movies: data.movies,
					isLoading: false,
				});
			});
	}

	render() {
		const { movies, isLoading } = this.state;
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
