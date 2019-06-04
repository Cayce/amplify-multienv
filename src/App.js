import React, { Component } from "react";
import Amplify, { graphqlOperation, PubSub } from "aws-amplify";
import { withAuthenticator, Connect } from "aws-amplify-react";
import { AWSIoTProvider, MqttOverWSProvider } from '@aws-amplify/pubsub/lib/Providers'

import "./App.css";

import awsConfig from "./aws-exports";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

Amplify.configure(awsConfig);


Amplify.addPluggable(new AWSIoTProvider({
    aws_pubsub_region: 'us-east-2',
    aws_pubsub_endpoint: 'wss://a73c5uwwia0zy-ats.iot.us-east-2.amazonaws.com'
}))

Amplify.addPluggable(new MqttOverWSProvider({
    aws_pubsub_endpoint: 'wss://iot.eclipse.org:443/mqtt'
}))

PubSub.subscribe('silo-mobile-app').subscribe({
    next: data => console.log('Message received', data),
    error: error => console.error(error),
    close: () => console.log('Done')
})

console.log('Message sent')
PubSub.publish('silo-mobile-app', { msg: 'Hello to all subscribers!' })

const ListView = ({ todos }) => (
  <div>
    <h2>All Todos</h2>
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.name} - {todo.description} - ({todo.id})
        </li>
      ))}
    </ul>
  </div>
);

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: ""
    };
  }

  handleChange(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  async submit() {
    const { onCreate } = this.props;
    var input = {
      name: this.state.name,
      description: this.state.description
    };

    this.setState({ name: "", description: "" });
    await onCreate({ input });
  }

  render() {
    return (
      <div>
        <input
          name="name"
          placeholder="name"
          onChange={ev => {
            this.handleChange("name", ev);
          }}
          style={{
            padding: "8px 16px",
            margin: "5px"
          }}
        />
        <input
          name="description"
          placeholder="description"
          onChange={ev => {
            this.handleChange("description", ev);
          }}
          style={{
            padding: "8px 16px",
            margin: "5px"
          }}
        />
        <button
          style={{
            padding: "8px 16px",
            margin: "5px"
          }}
          onClick={this.submit.bind(this)}
        >
          Add
        </button>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default withAuthenticator(App, true);
