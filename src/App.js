import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import NewUserList from "./components/newuser-list.component";
import CreateNewUser from "./components/create-newuser.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={NewUserList} />
      <Route path="/create" component={CreateNewUser} />
      </div>
    </Router>
  );
}

export default App;
