// Using class component and lifecycle method:
import React, { Component } from 'react'

class Movie extends Component {
	state = { movie: {} };

	componentDidMount() {
		this.setState({
			movie: {
				id: this.props.match.params.id,
				title: "Some fake movie",
				runtime: 155
			}
		})
	}

	render() {
		return (
			<div>
				<h2>
					Movie: {this.state.movie.title} {this.state.movie.id}
				</h2>
				<table className='table table-compact table-striped'>
					<thead></thead>
					<tbody>
						<tr>
							<td>
								<strong>Title:</strong>
							</td>
							<td>{this.state.movie.title}</td>
						</tr>

						<tr>
							<td>
								<strong>Run time:</strong>
							</td>
							<td>{this.state.movie.runtime} Minutes</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default Movie



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
