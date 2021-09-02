import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Genre extends Component {
	state = {
		movies: [],
		isLoading: true,
		error: null,
	};

	fetchAllMovies = () => {
		fetch(`http://localhost:4000/v1/movies/${this.props.match.params.id}`)
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
		this.fetchAllMovies();
	}

	render() {
		let { movies, isLoading, error } = this.state;

		if (!movies) {
			movies = [];
		}

		if (error) return <h3>Error: {error.message}</h3>;

		return (
			<>
				{isLoading ? (
					<h3>Fetching Movies...</h3>
				) : (
					<>
						<h2>Genre: </h2>
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
