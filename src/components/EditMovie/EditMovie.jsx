import React, { Component } from 'react';
import './EditMovie.css';

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
	};

	componentDidMount() {}

	handleSubmit = (e) => {
		e.preventDefault();
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
					<div className='mb-3'>
						<label htmlFor='title' className='form-label'>
							Title
						</label>
						<input
							type='text'
							className='form-control'
							id='title'
							name='title'
							value={movie.title}
							onChange={this.handleChange}
						/>
					</div>

					<div className='mb-3'>
						<label htmlFor='release_date' className='form-label'>
							Release Date
						</label>
						<input
							type='text'
							className='form-control'
							id='release_date'
							name='release_date'
							value={movie.release_date}
							onChange={this.handleChange}
						/>
					</div>

					<div className='mb-3'>
						<label htmlFor='runtime' className='form-label'>
							Runtime
						</label>
						<input
							type='text'
							className='form-control'
							id='runtime'
							name='runtime'
							value={movie.runtime}
							onChange={this.handleChange}
						/>
					</div>

					<div className='mb-3'>
						<label htmlFor='mpaa_rating' className='form-label'>
							MPAA Rating
						</label>
						<select
							className='form-select'
							name='mpaa_rating'
							id='mpaa_rating'
							value={movie.mpaa_rating}
							onChange={this.handleChange}
						>
							<option className='form-select'>Choose...</option>
							<option className='form-select' value='G'>
								G
							</option>
							<option className='form-select' value='PG'>
								PG
							</option>
							<option className='form-select' value='PG13'>
								PG13
							</option>
							<option className='form-select' value='R'>
								R
							</option>
							<option className='form-select' value='NV17'>
								NV17
							</option>
						</select>
					</div>

					<div className='mb-3'>
						<label htmlFor='rating' className='form-label'>
							Rating
						</label>
						<input
							type='text'
							className='form-control'
							id='rating'
							name='rating'
							value={movie.rating}
							onChange={this.handleChange}
						/>
					</div>

					<div className='mb-3'>
						<label htmlFor='description' className='form-label'>
							Description
						</label>
						<textarea
							className='form-control'
							id='description'
							name='description'
							value={movie.description}
							onChange={this.handleChange}
							rows='3'
						/>
					</div>
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
