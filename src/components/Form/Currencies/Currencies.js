import React, {Component} from 'react';
import './Currencies.scss';
import Select from 'react-select'
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

class Currencies extends Component{

    state = {
        available_currencies: [],
        selected_currencies: [],
        selected_currency: null,
        buttonClass: 'disabled',
        formError: false
    };

    componentWillMount = async () => {
        // gets all available currencies
        const available_currencies = [];
        const response = await axios.get('https://openexchangerates.org/api/currencies.json');
        for(let key in response.data) {
            available_currencies.push({
                value: key, label: response.data[key]
            });
        }

        this.setState({available_currencies})
    };

    // check if button should be enabled or disabled
    checkIfButtonShouldBeEnabled = (nextProps) => {
        if(nextProps.btc_val !== null &&  nextProps.btc_val !== "" && this.state.selected_currency) this.setState({buttonClass:null});
        else this.setState({buttonClass: 'disabled'});
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.checkIfButtonShouldBeEnabled(nextProps);
    }

    checkIfCurrencyHasBeenAlreadyAdded = () => {
          for(let i = 0; i < this.state.selected_currencies.length; i++) {
              if(this.state.selected_currencies[i] === this.state.selected_currency) return  true
          }

          return false;
    };

    addCurrency = (e) => {
        e.preventDefault();
        if(!this.checkIfCurrencyHasBeenAlreadyAdded()) {
            const selected_currencies = [...this.state.selected_currencies];
            selected_currencies.push(this.state.selected_currency);
            this.setState({selected_currencies, buttonClass: 'disabled'}, () => {
                this.props.updateCurrencies(this.state.selected_currencies);
            });
        } else this.setState({formError: true});
    };

    handleChangeSelection = (selectedOption) => {
        if(this.props.btc_val !== null) {
            this.setState({
                selected_currency: selectedOption.value,
                buttonClass: null,
                formError: false
            });
        } else {
            this.setState({selected_currency: selectedOption.value});
        }
    };

        render() {
        return (
            <React.Fragment>
                <div className="currencies">
                    <label>Select currencies:</label>
                    <Select
                        options={this.state.available_currencies}
                        onChange={this.handleChangeSelection}
                    />
                </div>
                <button id="add-currency" className={this.state.buttonClass} onClick={(e) => this.addCurrency(e)}>Add currency</button>
                {this.state.formError ? <span className="error">Currency has been already added</span> : null}
            </React.Fragment>
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
        updateCurrencies: (selected_currencies) => dispatch(actions.updateCurrencies(selected_currencies))
    }
};


export default connect(mapStateToProps,mapDispatchToProps) (Currencies);