import React, { Component } from 'react';
import './ListForm.css';

class ListForm extends Component {
  render() {
    return (
      <div className="ListForm">
        <div className="symbol">{this.props.symbol}</div>
        <div className="name">{this.props.name}</div>
      </div>
    );
  }
}

export default ListForm;
