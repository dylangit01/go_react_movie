import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Movies extends Component {
	state = {
		movies: [],
	};

	componentDidMount() {
		this.setState({
			movies: [
				{id: 1, title: 'The Shawshank Redemption', runtime: 142},
				{id: 2, title: 'The Godfather', runtime: 175},
				{id: 3, title: 'The Dark Knight', runtime: 200},
			]
		})
	}

	render() {
		return (
			<>
				<h2>Choose a movie</h2>
				<ul>
					{
						this.state.movies.map(movie => (
							<li key={movie.id}>
								<Link to="">{movie.title}</Link>
							</li>
						))
					}
				</ul>
			</>
		);
	}
}

export default Movies;
