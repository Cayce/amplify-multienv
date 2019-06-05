import React, { Component } from "react";
import Amplify, { PubSub, Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

import "./App.css";
import awsConfig from "./aws-exports";

Amplify.configure(awsConfig);

Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: 'us-east-2',
  aws_pubsub_endpoint: 'wss://a73c5uwwia0zy-ats.iot.us-east-2.amazonaws.com/mqtt'
}))

PubSub.subscribe('silo-mobile-app').subscribe({
  next: data => console.log('Message received', data),
  error: error => console.error(error),
  close: () => console.log('Done')
})

Auth.currentCredentials().then((info) => {
  console.log(info._identityId);
});

console.log('Message sent')
PubSub.publish('silo-mobile-app', { msg: 'Hello to all subscribers!' })

class App extends Component {
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default withAuthenticator(App, true);
