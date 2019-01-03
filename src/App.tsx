import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

console.log(process.env);

export class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            Work-in-progress!
            Father income: {process.env.REACT_APP_FATHER_INCOME}
        </header>
      </div>
    );
  }
}
