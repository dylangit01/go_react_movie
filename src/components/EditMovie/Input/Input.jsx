import React from 'react'

const Input = ({ title, type, name, value, handleChange, placeholder }) => {
	return (
		<div className='mb-3'>
			<label htmlFor={name} className='form-label'>
				{title}
			</label>
			<input
				type={type}
				className='form-control'
				id={name}
				name={name}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default Input
