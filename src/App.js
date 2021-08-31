
function App() {
  return (
		<div className='container'>
			<div className='row'>
				<h1 className='mt-3'>Go Watch a Movie!</h1>
				<hr className='mb-3' />
			</div>

			<div className='row'>
				<div className='col-md-3'>
					<nav>
						<ul className='list-group'>
							<li className='list-group-item'>
								<a href='/'>Home</a>
							</li>
							<li className='list-group-item'>
								<a href='/movies'>Movies</a>
							</li>
							<li className='list-group-item'>
								<a href='/admin'>Manage Catalogue</a>
							</li>
						</ul>
					</nav>
				</div>
				<div className='col-md-9'></div>
			</div>
		</div>
	);
}

export default App;
