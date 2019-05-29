import React, {Component} from 'react';
import './CurrencyItem.scss';
import he from 'he';
import closeIcon from '../../../assets/images/icons/cancel-music.svg';
import {connect} from 'react-redux';
import * as actions from "../../../store/actions";

class CurrencyItem extends Component  {

    // remove currencies from the display
    removeCurrencyOnDisplay = () => {
        const currenciesOnDisplay = [...this.props.currenciesOnDisplay];

        for(let i = 0; i < currenciesOnDisplay.length; i++) {
            if(currenciesOnDisplay[i] === this.props.currencyData.code) {
                currenciesOnDisplay.splice(i,1);
                break;
            }
        }

        this.props.updateCurrenciesOnDisplay(currenciesOnDisplay);
    };

    render() {
        return(
            <div className="currencyItem">
                <p className="description">{this.props.currencyData.description}</p>
                <p className="value"><span id="symbol">{he.decode(this.props.currencyData.symbol)}</span> {this.props.currencyData.rate}</p>
                <img id="close-icon" src={closeIcon} alt="close-icon" onClick={this.removeCurrencyOnDisplay}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currenciesOnDisplay: state.currenciesOnDisplay
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateCurrenciesOnDisplay: (currenciesOnDisplay) => dispatch(actions.updateCurrenciesOnDisplay(currenciesOnDisplay))
    }
};


export default connect(mapStateToProps, mapDispatchToProps) (CurrencyItem);