import React, { Component } from 'react';
import './App.css';
import Links from './components/Links';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return (
    <React.Fragment>
        <Nav />
        <div className="container p-5">
            <div>
                <Links />
            </div>
        </div>
    </React.Fragment>
    );
  }
}

export default App;
