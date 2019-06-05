import React, { Component } from "react";
import Amplify, { graphqlOperation } from "aws-amplify";
import { withAuthenticator, Connect } from "aws-amplify-react";

import "./App.css";

// import awsConfig from "./aws-exports";

Amplify.configure(awsConfig);

class App extends Component {
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default withAuthenticator(App, true);
