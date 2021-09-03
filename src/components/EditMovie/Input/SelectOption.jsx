import React from 'react';

const SelectOption = ({ name, title, value, handleChange, placeholder, options, errorDiv, errorMsg, className }) => {
	return (
		<div className='mb-3'>
			<label htmlFor={name} className='form-label'>
				{title}
			</label>
			<select className={`form-select ${className}`} name={name} id={name} value={value} onChange={handleChange}>
				<option className='form-select' value=''>
					{placeholder}
				</option>
				{options.map((option) => (
					<option className='form-select' key={option.id} value={option.id}>
						{option.value}
					</option>
				))}
			</select>
			<div className={errorDiv}>{errorMsg}</div>
		</div>
	);
};

export default SelectOption;
