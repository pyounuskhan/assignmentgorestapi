import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">GoREST API MERN</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Users</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create New User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/exportdata" className="nav-link">Export Data</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}