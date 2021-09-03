import React from 'react'

const Textarea = ({name, title, value, handleChange, rows}) => {
	return (
		<div className='mb-3'>
			<label htmlFor='description' className='form-label'>
				{title}
			</label>
			<textarea
				className='form-control'
				id={name}
				name={name}
				value={value}
				onChange={handleChange}
				rows={rows}
			/>
		</div>
	);
}

export default Textarea
