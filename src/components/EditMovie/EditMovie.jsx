import React, { Component } from 'react';
import './EditMovie.css';
import Input from './Input/Input';
import SelectOption from './Input/SelectOption';
import Textarea from './Input/Textarea';

export default class EditMovie extends Component {
	state = {
		movie: {
			id: 0,
			title: '',
			release_date: '',
			runtime: '',
			mpaa_rating: '',
			rating: '',
			description: '',
		},
		isLoading: true,
		error: null,
		mpaaOptions: [
			{ id: 'G', value: 'G' },
			{ id: 'PG', value: 'PG' },
			{ id: 'PG13', value: 'PG13' },
			{ id: 'R', value: 'R' },
			{ id: 'NV17', value: 'NV17' },
		],
	};

	componentDidMount() {}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('XXXXXXXXXXX');
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState((prevState) => ({
			movie: {
				...prevState.movie,
				[name]: value,
			},
		}));
	};

	render() {
		let { movie } = this.state;
		return (
			<>
				<h2>Add/Edit Movie</h2>
				<hr />
				<form onSubmit={this.handleSubmit}>
					<input type='hidden' name='id' id='id' value={movie.id} onChange={this.handleChange} />

					<Input title='Title' type='text' name='title' value={movie.title} handleChange={this.handleChange} />

					<Input
						title='Release Date'
						type='date'
						name='release_date'
						value={movie.release_date}
						handleChange={this.handleChange}
					/>

					<Input title='Runtime' type='text' name='runtime' value={movie.runtime} handleChange={this.handleChange} />

					<SelectOption
						name='mpaa_rating'
						title='MPAA Rating'
						value={movie.mpaa_rating}
						handleChange={this.handleChange}
						placeholder='Choose...'
						options={this.state.mpaaOptions}
					/>

					<Input title='Rating' type='text' name='rating' value={movie.rating} handleChange={this.handleChange} />

					<Textarea
						title='Description'
						name='description'
						value={movie.description}
						handleChange={this.handleChange}
						rows='3'
					/>

					<hr />
					<button className='btn btn-outline-primary'>Add A Movie</button>
				</form>

				<div className='mt-3'>
					<pre>{JSON.stringify(this.state, null, 3)}</pre>
				</div>
			</>
		);
	}
}
