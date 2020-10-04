import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateNewUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeStatus(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeGender(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const newuser = {
      username: this.state.username,
      email: this.state.email,
      gender: this.state.gender,
      status: this.state.status,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(newuser);

    axios.post('http://localhost:5000/newuser/add', newuser)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
        <label>User Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              />
        </div>
        <div className="form-group"> 
          <label>Email: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
        </div>
        <div className="form-group"> 
          <label>Gender: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.gender}
              onChange={this.onChangeGender}
              />
        </div>
        <div className="form-group"> 
          <label>Status: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.status}
              onChange={this.onChangeStatus}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Create New User" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}