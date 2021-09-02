// Using class component and lifecycle method:
import { findByLabelText } from '@testing-library/react';
import React, { Component } from 'react';

class Movie extends Component {
	state = {
		movie: {},
		isLoading: true,
		error: null,
	};

	fetchMovie = () => {
		fetch(`http://localhost:4000/v1/movie/${this.props.match.params.id}`)
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
						movie: data.movie,
						isLoading: false,
					},
					// error is optional argument
					(error) => this.setState({ isLoading: false, error })
				);
			});
	};

	componentDidMount() {
		this.fetchMovie();
	}

	render() {
		const { movie, isLoading, error } = this.state;
		movie.genres ? (movie.genres = Object.values(movie.genres)) : (movie.genres = []);

		if (error) return <h3>Error: {error.message}</h3>;

		return (
			<>
				{isLoading ? (
					<h3>Loading...</h3>
				) : (
					<div>
						<h2>
							Movie: {movie.title} ({movie.year})
						</h2>

						<div className='d-flex justify-content-between align-items-center'>
							<div>
								<small>Rating: {movie.mpaa_rating}</small>
							</div>
							<div>
								{movie.genres.map((genre, i) => (
									<span className='badge bg-secondary me-1' key={i}>
										{genre}
									</span>
								))}
							</div>
						</div>
						<hr />

						<table className='table table-compact table-striped'>
							<thead></thead>
							<tbody>
								<tr>
									<td>
										<strong>Title:</strong>
									</td>
									<td>{movie.title}</td>
								</tr>
								<tr>
									<td>
										<strong>Description:</strong>
									</td>
									<td>{movie.description}</td>
								</tr>
								<tr>
									<td>
										<strong>Run time:</strong>
									</td>
									<td>{movie.runtime} Minutes</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</>
		);
	}
}

export default Movie;

/*
Using functional component and Hooks method:

import React from 'react';
import { useParams } from 'react-router-dom';

const Movie = () => {
	const { id } = useParams();

	return (
		<div>
			<h3>Movie id - {id}</h3>
		</div>
	);
};

export default Movie;

*/
