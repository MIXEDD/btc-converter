import React, {Component} from 'react';
import './CurrenciesList.scss';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';
import CurrencyItem from './CurrencyItem/CurrencyItem';

class CurrenciesList extends Component {

    state = {
        currencyData: []
    };

    componentWillMount = async () => {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        const currencyData = [];
        const selectorOptions = [];

        for(let key in response.data.bpi) {
            currencyData.push(response.data.bpi[key]);
            selectorOptions.push({

            });
        }

        this.setState({currencyData});
    };

    componentWillReceiveProps = async (nextProps, nextContext) => {
        let response;

        if(nextProps.selected_currencies.length)
            response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
    };

    render() {
        return(
            <div className="currencies-list">
                {
                    this.state.currencyData.map((element, index) => {
                        return <CurrencyItem key={index} currencyData={element}/>
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selected_currencies: state.currencies,
        btc_val: state.btcValue
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateCurrencies: (selected_currencies) => dispatch(actions.updateCurrencies(selected_currencies)),
        updateSelectorOptions: (selected_currencies) => dispatch(actions.updateCurrencies(selected_currencies))
    }
};


export default connect(mapStateToProps,mapDispatchToProps) (CurrenciesList);