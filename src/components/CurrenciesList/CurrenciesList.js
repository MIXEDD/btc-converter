import React, {Component} from 'react';
import './CurrenciesList.scss';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';
import CurrencyItem from './CurrencyItem/CurrencyItem';
import numeral from 'numeral';

class CurrenciesList extends Component {

    state = {
        currencyData: [],
        intervalInstance: null
    };

    // on component mount set currencies on display to it's default value
    // on component mount set selectorOptions (currencies)
    componentWillMount = async () => {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        const selectorOptions = [];
        const currenciesOnDisplay = [];

        for(let key in response.data.bpi) {
            selectorOptions.push({
                value: response.data.bpi[key].code,
                label: response.data.bpi[key].description
            });

            currenciesOnDisplay.push(response.data.bpi[key].code);
        }
        this.props.updateSelectorOptions(selectorOptions);
        this.props.updateCurrenciesOnDisplay(currenciesOnDisplay);
    };

    // data fetch and state management
    dataFetch = async (nextProps) => {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        const currencyData = [];

        if(nextProps.btc_val !== null && nextProps.btc_val !== "") {
            for(let key in response.data.bpi) {
                for(let i = 0; i < nextProps.currenciesOnDisplay.length; i++) {
                    if(nextProps.currenciesOnDisplay[i] === response.data.bpi[key].code) {
                        const priceIndex = numeral(response.data.bpi[key].rate);
                        currencyData.push({
                            ...response.data.bpi[key],
                            rate: priceIndex.multiply(nextProps.btc_val).format('0,0.0000')
                        });
                    }
                }
            }

            this.setState({currencyData});
        }
    };

    // interval for data fetch
    // fires every minute
    createInterval = (nextProps) => {
        const instance = setInterval(() => {
            this.dataFetch(nextProps);
        }, 60000);
        this.setState({intervalInstance:instance});
    };

    componentWillReceiveProps (nextProps, nextContext) {
        if(nextProps.btc_val !== null && nextProps.btc_val !== "") {
            this.dataFetch(nextProps);

            if(this.state.intervalInstance === null) {
                this.createInterval(nextProps);
            } else {
                clearInterval(this.state.intervalInstance);
                this.createInterval(nextProps);
            }
        }
        else this.setState({currencyData: []});
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
        btc_val: state.btcValue,
        currenciesOnDisplay: state.currenciesOnDisplay
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateSelectorOptions: (selectorOptions) => dispatch(actions.updateSelectorOptions(selectorOptions)),
        updateCurrenciesOnDisplay: (currenciesOnDisplay) => dispatch(actions.updateCurrenciesOnDisplay(currenciesOnDisplay))
    }
};


export default connect(mapStateToProps,mapDispatchToProps) (CurrenciesList);