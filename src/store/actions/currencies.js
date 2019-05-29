import * as actionTypes from './actionTypes';

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


export const updateCurrenciesOnDisplay = (currenciesOnDisplay) => {
    return {
        type:actionTypes.UPDATE_CURRENCIES_ON_DISPLAY,
        currenciesOnDisplay
    };
};
