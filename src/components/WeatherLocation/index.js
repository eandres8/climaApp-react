import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PropTypes } from 'prop-types';
import './styles.css';

import { SUN } from '../../constans/weathers';

import transformWeather from '../../services/transformWeather';
import getUrlWeatherByCity from '../../services/getUrlWeatherByCity';

import Location from './Location';
import WeatherData from './WeatherData';

const data = {
	temperature: 5,
	weatherState: SUN,
	humidity: 10,
	wind: '10 m/s'
};

class WeatherLocation extends Component {

	constructor(props) {
		super(props);
		const { city } = props;

		this.state = {
			city: city,
			data: null
		};
		//#debug#
		console.log('constructor');
	}

	componentDidMount() {
		//#debug#
		console.log('componentDidMount');
		this.handleUpdateClick();
	}
	
	componentDidUpdate(prevProps, prevState) {
		//#debug#
		console.log('componentDidUpdate');
	}

	handleUpdateClick = () => {
		const api_weather = getUrlWeatherByCity( this.state.city );
		fetch( api_weather )
			.then( ( resolve ) => {
				return resolve.json();
			} )
			.then( data => {
				const newData = transformWeather(data);
				this.setState({
					data: newData
				});
			} )
			.catch( err => console.log("error", err) );

	}

	render() {
		//#debug#
		console.log('render');
		const { city, data } = this.state;
		return ( <div className = "weatherLocationCont">
			<Location city = { city }/>
			{ data ? 
				<WeatherData data = { data }/> :
				<CircularProgress size={50} />
			}
			</div>
		);
	}
}

WeatherLocation.propTypes = {
	city: PropTypes.string.isRequired,
}

export default WeatherLocation;