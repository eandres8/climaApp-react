import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ForecastExtended from '../components/ForecastExtended';


class ForecastExtendedContainer extends Component {
    render() {
        return (
            <div>
                {
                    this.props.city ?
                    <ForecastExtended city={this.props.city} /> :
                    <h1>No se ha seleccionado una ciudad</h1>
                }
            </div>
        );
    }
}

ForecastExtendedContainer.propTypes = {
    city: PropTypes.string.isRequired,
};

// Obtiene siempre el state = { city: "Bogota,co" }, destructuring
const mapStateToProps = ({city}) => ({city});

export default connect( mapStateToProps, null)(ForecastExtendedContainer);