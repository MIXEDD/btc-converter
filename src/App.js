import React, { Component } from 'react';
import Layout from './HOC/Layout/Layout';
import './App.scss';

class App extends Component {
  render() {
    return (
     <div className="App wrapper">
        <Layout/>
    </div>
    );
  }
}

export default App;
