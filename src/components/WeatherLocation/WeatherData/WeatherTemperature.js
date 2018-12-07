import React from 'react';
import PropTypes from 'prop-types';
import WeatherIcons from 'react-weathericons';

import {
    CLOUD,
    CLOUDY,
    SUN,
    RAIN,
    SNOW,
    WINDY,
} from '../../../constans/weathers';

import './styles.css';

const icons = {
    [CLOUD]: 'cloud',
    [CLOUDY]: 'cloudy',
    [RAIN]: 'rain',
    [SNOW]: 'snow',
    [WINDY]: 'windy',
    [SUN]: 'day-sunny',
}

const getWeatherIcon = weatherState => {
    const icon = icons[weatherState];
    const sizeIcon = "4x";
    if (icon)
        return (<WeatherIcons className="wicon" name={icon} size="2x" />);
    else
        return (<WeatherIcons className="wicon" name={"day-sunny"} size={sizeIcon} />);
}

const WeatherTemperature = ( {temperature, weatherState } ) => {
    return (
        <div className="weatherTemperatureCont">
            { getWeatherIcon( weatherState ) }
            <span className="temperature">{`${temperature}`}</span>
            <span className="temperatureType">{` Cº`}</span>
        </div>
    );
}

WeatherTemperature.propTypes = {
    temperature: PropTypes.number.isRequired,
    weatherState: PropTypes.string.isRequired
}

export default WeatherTemperature;