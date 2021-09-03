const Alert = ({ alert }) => {

	return (
		<div className={`alert ${alert.type}`} role='alert'>
			{alert.message}
		</div>
	);
};

export default Alert;
