import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewUser = props => (
  <tr>
    <td>{props.newuser.username}</td>
    <td>{props.newuser.email}</td>
    <td>{props.newuser.gender}</td>
    <td>{props.newuser.status}</td>
    <td>{props.newuser.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class NewUserList extends Component {
  constructor(props) {
    super(props);

    this.deleteNewUser = this.deleteNewUser.bind(this)

    this.state = {newuser: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/newuser/')
      .then(response => {
        this.setState({ newuser: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteNewUser(id) {
    axios.delete('http://localhost:5000/newuser/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      newuser: this.state.newuser.filter(el => el._id !== id)
    })
  }

  newuserList() {
    return this.state.newuser.map(currentnewuser => {
      return <NewUser newuser={currentnewuser} deleteNewUser={this.deleteNewUser} key={currentnewuser._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Users List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              
            </tr>
          </thead>
          <tbody>
            { this.newuserList() }
          </tbody>
        </table>
      </div>
    )
  }
}