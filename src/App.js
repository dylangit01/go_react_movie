import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Movies from './components/Movies/Movies';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import Movie from './components/Movie/Movie';
import Categories from './components/Categories/Categories';
import Category from './components/Category/Category';

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
									<Link to='/categories'>Catagories</Link>
								</li>
								<li className='list-group-item'>
									<Link to='/admin'>Manage Catalogue</Link>
								</li>
							</ul>
						</nav>
					</div>

					<div className='col-md-9'>
						<Switch>
							<Route exact path='/categories'>
								<Categories />
							</Route>
							<Route exact path='/categories/drama'>
								<Category title={`Drama`} />
							</Route>
							<Route exact path='/categories/comedy'>
								<Category title={`Comedy`} />
              </Route>
							<Route exact path='/movies'>
								<Movies />
              </Route>
              
              <Route exact path='/movies/:id' render={(props) => <Movie {...props} />} />
              
							<Route exact path='/admin'>
								<Admin />
							</Route>
							<Route exact path='/'>
								<Home />
							</Route>
						</Switch>
					</div>
				</div>
			</div>
		</Router>
	);
}
