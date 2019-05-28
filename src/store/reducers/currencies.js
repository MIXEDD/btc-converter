import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../shared/Utility";

const initialState = {
    currencies: [],
    btcValue: null,
    selector_options: []
};

export const updateCurrencies = (state,action) => {
    const newObject = {
        currencies: action.currencies
    };

    return updateObject(state, newObject);
};

export const updateBTCValue = (state, action) => {
    const newObject = {
        btcValue:action.btcVal
    };

    return updateObject(state, newObject);
};

export const updateSelectorOptions = (state, action) => {
    const newObject = {
        selector_options:action.selectorOptions
    };

    return updateObject(state, newObject);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_CURRENCIES: return updateCurrencies(state, action);
        case actionTypes.UPDATE_BTC_VAL: return updateBTCValue(state, action);
        case actionTypes.UPDATE_SELECTOR_OPTIONS: return updateSelectorOptions(state, action);
    default: return state;
    }
};

export default reducer;