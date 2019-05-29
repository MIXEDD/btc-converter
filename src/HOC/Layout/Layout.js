import React, {Component} from 'react';
import './Layout.scss';
import Form from '../../components/Form/Form';
import CurrenciesList from '../../components/CurrenciesList/CurrenciesList';

class Layout extends Component{
    render() {
        return (
            <React.Fragment>
                <Form/>
                <CurrenciesList/>
            </React.Fragment>
        );
    }
}

export default Layout;