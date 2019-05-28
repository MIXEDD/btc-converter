import React, {Component} from 'react';
import './Form.scss';
import BtcInput from './BtcInput/BtcInput';
import Currencies from './Currencies/Currencies';

class Form extends Component{


    render() {
        return (
            <form>
                <BtcInput/>
                <Currencies/>
            </form>
        );
    }
}

export default Form;