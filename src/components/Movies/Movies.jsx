import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Movies extends Component {
	state = {
		movies: [],
		isLoading: true,
		error: null,
	};

	// Async / Await method:

	// fetchMovies = async () => {
	// 	const URL = 'http://localhost:4000/v1/movies'
	// 	try {
	// 		const { movies } = await (await fetch(URL)).json();
	// 		this.setState({
	// 			movies,
	// 			isLoading: false,
	// 		});
	// 	} catch (e) {
	// 		const res = await fetch(URL);
	// 		if (res.state !== '200') {
	// 			const err = new Error();
	// 			err.message = `Invalid response code: ${res.status}`;
	// 			this.setState({
	// 				error: err,
	// 				isLoading: false,
	// 			});
	// 		}
	// 	}
	// };

	// fetchMovieUsingAsyncAwait = async () => {
	// 	const URL = 'http://localhost:4000/v1/movies';
	// 	try {
	// 		const res = await fetch(URL);
	// 		if (res.state !== '200') {
	// 			throw new Error('Something went wrong');
	// 		}
	// 		const data = res.json();
	// 		this.setState({
	// 			movies: data.movies,
	// 			isLoading: false,
	// 		});
	// 	} catch (error) {
	// 		this.setState({
	// 			error,
	// 			isLoading: false,
	// 		});
	// 	}
	// };

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
					// error is optional argument
					(error) => this.setState({ isLoading: false, error })
				);
			});
	};

	componentDidMount() {
		// this.fetchMovies();
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
						<h2>Choose a movie</h2>
						<div className='list-group'>
							{movies.map((movie) => (
								<Link key={movie.id} to={`/movies/${movie.id}`} className='list-group-item list-group-item-action'>
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

export default Movies;
