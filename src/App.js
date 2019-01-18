import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import LocationList from './components/LocationList';
import ForecastExtended from './components/ForecastExtended';

import { setCity } from './actions';
import './App.css';

const cities = [
	"Buenos Aires,ar",
	"Bogota,col",
	"Mexico,mex",
	"Toronto,can",
	"New York,us",
	"Sao Paulo,br",
];

class App extends Component {

	constructor() {
		super();
		this.state = {
			city: null
		};
	}

	handleSelectedLocation = city => {
		this.setState( { city } );
		//#debug#
		console.log(`handleSelectedLocation ${city}`);

		this.props._setCity(city);
	}

	render() {
		const { city } = this.state;
		return (
			<Grid>
				<Row>
					<AppBar position='sticky'>
						<Toolbar>
							<Typography variant='title' color='inherit'>
								Weather App
							</Typography>
						</Toolbar>
					</AppBar>
				</Row>
				<Row>
					<Col xs={12} md={6}>
						<div className="App">
							<LocationList cities={cities} onSelectedLocation={this.handleSelectedLocation} />
						</div>
					</Col>
					<Col xs={12} md={6}>
						<Paper elevation={4}>
							<div className="detail">
								{
									city ?
									<ForecastExtended city={city} /> :
									<h1>No se ha seleccionado una ciudad</h1>
								}
							</div>
						</Paper>
					</Col>
				</Row>
			</Grid>
		);
	}
}

App.propTypes = {
	_setCity: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
	_setCity: value => dispatch(setCity(value))
});

export default connect(null, mapDispatchToProps)(App);
