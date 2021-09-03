import React, { Component } from 'react';
import Alert from '../Alert/Alert';
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
		mpaaOptions: [
			{ id: 'G', value: 'G' },
			{ id: 'PG', value: 'PG' },
			{ id: 'PG13', value: 'PG13' },
			{ id: 'R', value: 'R' },
			{ id: 'NV17', value: 'NV17' },
		],
		isLoading: true,
		error: null,
		errors: [], // --> for form validation
		alert: {
			type: 'd-none',
			message: '',
		},
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

		const { title, release_date, runtime, mpaa_rating, rating } = this.state.movie;
		// form validation
		let errors = [];
		if (title === '') errors.push('title');
		// if (release_date === '') errors.push('release_date');
		// if (runtime === '') errors.push('runtime');
		// if (mpaa_rating === '') errors.push('mpaa_rating');
		// if (rating === '') errors.push('rating');

		this.setState({ errors });
		if (errors.length > 0) return false;

		// const formData = this.state.movie; --> id is not string, so will have error from backend
		const formData = new FormData(e.target);
		const payload = Object.fromEntries(formData.entries());

		const addMovie = async (data) => {
			const res = await fetch(`${ENDPOINT}/admin/editmovie`, {
				method: 'POST',
				body: JSON.stringify(data),
			});
			const dataFromServer = await res.json();
			if (dataFromServer.error) {
				this.setState({
					alert: { type: 'alert-danger', message: dataFromServer.error.message },
				});
			} else {
				this.setState({
					alert: { type: 'alert-success', message: 'Changes saved!' },
				});
			}
		};
		addMovie(payload);
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

	hasError = (inputField) => {
		return this.state.errors.indexOf(inputField) !== -1;
	};

	render() {
		let { movie, isLoading, error, alert } = this.state;

		if (error) return <h3>Error: {error.message}</h3>;

		return (
			<>
				{isLoading ? (
					<h3>Loading...</h3>
				) : (
					<>
						<h2>Add/Edit Movie</h2>
						<Alert alert={alert} />
						<hr />
						<form onSubmit={this.handleSubmit}>
							<input type='hidden' name='id' id='id' value={movie.id} onChange={this.handleChange} />

							<Input
								className={this.hasError('title') ? 'is-invalid' : ''}
								title='Title'
								type='text'
								name='title'
								value={movie.title}
								handleChange={this.handleChange}
								errorDiv={this.hasError('title') ? 'text-danger' : 'd-none'}
								errorMsg={'please enter a title'}
							/>

							<Input
								className={this.hasError('release_date') ? 'is-invalid' : ''}
								title='Release Date'
								type='date'
								name='release_date'
								value={movie.release_date}
								handleChange={this.handleChange}
								errorDiv={this.hasError('release_date') ? 'text-danger' : 'd-none'}
								errorMsg={'please enter a release date'}
							/>

							<Input
								className={this.hasError('runtime') ? 'is-invalid' : ''}
								title='Runtime'
								type='text'
								name='runtime'
								value={movie.runtime}
								handleChange={this.handleChange}
								errorDiv={this.hasError('runtime') ? 'text-danger' : 'd-none'}
								errorMsg={'please enter a runtime'}
							/>

							<SelectOption
								className={this.hasError('mpaa_rating') ? 'is-invalid' : ''}
								name='mpaa_rating'
								title='MPAA Rating'
								value={movie.mpaa_rating}
								handleChange={this.handleChange}
								placeholder='Choose...'
								options={this.state.mpaaOptions}
								errorDiv={this.hasError('mpaa_rating') ? 'text-danger' : 'd-none'}
								errorMsg={'please choose a mpaa_rating'}
							/>

							<Input
								className={this.hasError('rating') ? 'is-invalid' : ''}
								title='Rating'
								type='text'
								name='rating'
								value={movie.rating}
								handleChange={this.handleChange}
								errorDiv={this.hasError('rating') ? 'text-danger' : 'd-none'}
								errorMsg={'please choose a rating'}
							/>

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
			</>
		);
	}
}
