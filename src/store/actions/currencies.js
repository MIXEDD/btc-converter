import * as actionTypes from './actionTypes';

export const updateCurrencies = (currencies) => {
    return {
        type:actionTypes.UPDATE_CURRENCIES,
        currencies
    };
};

export const updateBTCValue = (btcVal) => {
    return {
        type:actionTypes.UPDATE_BTC_VAL,
        btcVal
    };
};

export const updateSelectorOptions = (selectorOptions) => {
    return {
        type:actionTypes.UPDATE_SELECTOR_OPTIONS,
        selectorOptions
    };
};
