import React, { Component } from 'react';
import './EditMovie.css';
import Input from './Input/Input';
import SelectOption from './Input/SelectOption';
import Textarea from './Input/Textarea';

const ENDPOINT = 'http://localhost:4000/v1';

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

	componentDidMount() {
		const id = this.props.match.params.id;
		if (id > 0) {
			fetch(`${ENDPOINT}/movie/${id}`)
				.then((res) => {
					if (res.status !== '200') {
						const err = new Error();
						err.message = `Invalid response code: ${res.status}`;
						this.setState({ error: err });
					}
					return res.json();
				})
				.then((data) => {
					const releaseDate = new Date(data.movie.release_date);
					const { id, title, runtime, mpaa_rating, rating, description } = data.movie;
					this.setState(
						{
							movie: {
								id,
								title,
								release_date: releaseDate.toISOString().split('T')[0],
								runtime,
								mpaa_rating,
								rating,
								description,
							},
							isLoading: false,
						},
						(error) => this.setState({ isLoading: false, error })
					);
				});
		} else {
			this.setState({ isLoading: false });
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();

		// const formData = new FormData(e.target);
		// const payload = Object.fromEntries(formData.entries());

		const formData = this.state.movie;
		const addMovie = async (data) => {
			const res = await fetch(`${ENDPOINT}/admin/editmovie`, {
				method: 'POST',
				body: JSON.stringify(data),
			});
			const dataFromServer = await res.json();
			console.log(dataFromServer);
		};
		addMovie(formData);
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
		let { movie, isLoading, error } = this.state;

		if (error) return <h3>Error: {error.message}</h3>;

		return (
			<>
				{isLoading ? (
					<h3>Loading...</h3>
				) : (
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

							<Input
								title='Runtime'
								type='text'
								name='runtime'
								value={movie.runtime}
								handleChange={this.handleChange}
							/>

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
							<button className='btn btn-outline-primary'>{this.state.movie.id > 0 ? 'Edit' : 'Add'} Movie</button>
						</form>
					</>
				)}
				<div className='mt-3'>
					<pre>{JSON.stringify(this.state, null, 3)}</pre>
				</div>
			</>
		);
	}
}
