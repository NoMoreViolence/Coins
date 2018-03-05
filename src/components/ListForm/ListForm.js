import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './ListForm.css';

class ListForm extends Component {
  render() {
    return (
      <div className="ListForm">
        <div className="symbol">{this.props.symbol}</div>
        <div className="name">{this.props.name}</div>
        <NavLink to={this.props.symbol}>
          <button className="details_button">Details...</button>
        </NavLink>
      </div>
    );
  }
}

export default ListForm;
