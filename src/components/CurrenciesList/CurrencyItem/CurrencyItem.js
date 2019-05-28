import React from 'react';
import './CurrencyItem.scss';
import he from 'he';
import closeIcon from '../../../assets/images/icons/cancel-music.svg';

const currencyItem = (props) => (
    <div className="currencyItem">
        <p className="description">{props.currencyData.description}</p>
        <p className="value"><span id="symbol">{he.decode(props.currencyData.symbol)}</span> {props.currencyData.rate}</p>
        <img id="close-icon" src={closeIcon} alt="close-icon"/>
    </div>
);

export default currencyItem;