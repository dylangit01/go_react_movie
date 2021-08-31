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
