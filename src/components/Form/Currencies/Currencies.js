import React, {Component} from 'react';
import './Currencies.scss';
import Select from 'react-select'
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

class Currencies extends Component{

    state = {
        available_currencies: [],
        selected_currency: null,
        buttonClass: 'disabled',
        formError: false
    };

    // check if button should be enabled or disabled
    checkIfButtonShouldBeEnabled = (nextProps) => {
        if(nextProps.btc_val !== null &&  nextProps.btc_val !== "" && this.state.selected_currency) this.setState({buttonClass:null});
        else this.setState({buttonClass: 'disabled'});

    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.checkIfButtonShouldBeEnabled(nextProps);
        // remove form error on prop change
        if(this.state.formError) this.setState({formError:false});
    }

    // prevent user from adding duplicate currency entries
    checkIfCurrencyHasBeenAlreadyAdded = () => {
         for(let i = 0; i < this.props.currenciesOnDisplay.length; i++)
             if(this.props.currenciesOnDisplay[i] === this.state.selected_currency) return true;

         return false;
    };

    // add currency function
    addCurrency = (e) => {
       e.preventDefault();

       if(!this.checkIfCurrencyHasBeenAlreadyAdded()) {
           const currenciesOnDisplay = [...this.props.currenciesOnDisplay];
           currenciesOnDisplay.push(this.state.selected_currency);
           this.props.updateCurrenciesOnDisplay(currenciesOnDisplay);
       } else this.setState({formError:true});
    };

    // handles change selections from the dropdown menu
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
            <div className="block">
                <label>Select currencies:</label>
                <Select
                    options={this.props.selector_options}
                    onChange={this.handleChangeSelection}
                />
                <button id="add-currency" className={this.state.buttonClass} onClick={(e) => this.addCurrency(e)}>Add currency</button>
                {this.state.formError ? <span className="error">Currency has been already added</span> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        btc_val: state.btcValue,
        selector_options: state.selector_options,
        currenciesOnDisplay: state.currenciesOnDisplay
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateCurrenciesOnDisplay: (currenciesOnDisplay) => dispatch(actions.updateCurrenciesOnDisplay(currenciesOnDisplay))
    }
};


export default connect(mapStateToProps,mapDispatchToProps) (Currencies);