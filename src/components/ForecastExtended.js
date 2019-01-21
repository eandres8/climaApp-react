import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';
import transformForecast from '../services/transformForecast';
import axios from 'axios';
import './styles.css';

const api_key = '110b5115f8d8beef34d13261c3e82c7a';
const url = 'http://api.openweathermap.org/data/2.5/forecast';

class ForecastExtended extends Component {

    constructor() {
        super();
        this.state = {
            forecastData: null
        };
    }

    componentDidMount() {
        this.updateCity( this.props.city );
    }

    componentWillReceiveProps( nextProps ) {
        if ( nextProps.city !== this.props.city ) {
            this.setState({ forecastData: null });
            this.updateCity( nextProps.city );
        }
    }

    updateCity = ( city ) => {
        // Fetch or axios
        const url_forecast = `${url}?q=${city}&appid=${api_key}`;
        // fetch( url_forecast ).then( data => (data.json()) )
        //             .then( weatherData => console.log(weatherData) );
        axios.get(url_forecast)
            .then(data => {
                let { data: weatherData } = data;
                console.log(weatherData);
                const forecastData = transformForecast(weatherData);
                //#debug#
                console.log('forecastData', forecastData);
                this.setState({ forecastData });
            });
    }

    renderForecastItemDays( forecastData ) {
        return forecastData.map( forecast => (
            <ForecastItem key={`${forecast.weekDay}-${forecast.hour}`} weekDay={forecast.weekDay} hour={forecast.hour} data={forecast.data} />
        ) );
    }

    renderProgress = () => {
        return <h3>Cargando pronóstico estendido...</h3>;
    }

    render() {
        const { city } = this.props;
        const { forecastData } = this.state;
        return ( 
            <div>
                <h2 className='forecast-title'> Pronostico extendido para {city} </h2>
                {
                    forecastData ?
                    this.renderForecastItemDays( forecastData ) :
                    this.renderProgress()
                }
            </div> 
        );
    }

}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired,
}

export default ForecastExtended;
