import React, {Component} from 'react';
import './BtcInput.scss';
import * as actions from "../../../store/actions";
import {connect} from 'react-redux';

class BtcInput extends Component{

    // updates entered BTC value to the store
    updateBTCValue = (e) => {
       this.props.updateBTCValue(e.target.value);
    };

    render() {
        return (
            <React.Fragment>
                <div className="block">
                    <label>Enter BTC:</label>
                    <input id="bitcoin-input" type="number" onChange={(e) => this.updateBTCValue(e)}/>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        btc_val: state.btcValue
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateBTCValue: (value) => dispatch(actions.updateBTCValue(value))
    }
};


export default connect(mapStateToProps, mapDispatchToProps) (BtcInput);