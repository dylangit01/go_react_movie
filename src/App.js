import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Movies from './components/Movies/Movies';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import Movie from './components/Movie/Movie';
import Genres from './components/Genres/Genres';
import Genre from './components/Genre/Genre';

export default function App() {
	return (
		<Router>
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
									<Link to='/'>Home</Link>
								</li>
								<li className='list-group-item'>
									<Link to='/movies'>Movies</Link>
								</li>
								<li className='list-group-item'>
									<Link to='/genres'>Genres</Link>
								</li>
								<li className='list-group-item'>
									<Link to='/admin/add'>Add movie</Link>
								</li>
								<li className='list-group-item'>
									<Link to='/admin'>Manage Catalogue</Link>
								</li>
							</ul>
						</nav>
					</div>

					<div className='col-md-9'>
						<Switch>
							<Route exact path='/genres'><Genres /></Route>
							<Route exact path='/genre/:id' render={(props) => <Genre {...props} />} />
							<Route exact path='/movies'><Movies /></Route>
							<Route exact path='/movies/:id' render={(props) => <Movie {...props} />} />
							<Route exact path='/admin/add'><Admin /></Route>
							<Route exact path='/admin/add' render={(props) => <EditMovie {...props} />} />
							<Route exact path='/'><Home /></Route>
						</Switch>
					</div>
				</div>
			</div>
		</Router>
	);
}
