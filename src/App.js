import React, { Component } from "react";
import Amplify, { graphqlOperation, PubSub, Auth } from "aws-amplify";
import { withAuthenticator, Connect } from "aws-amplify-react";
import { AWSIoTProvider, MqttOverWSProvider } from '@aws-amplify/pubsub/lib/Providers'

import "./App.css";

import awsConfig from "./aws-exports";

Amplify.configure(awsConfig);
PubSub.configure();

let username = 'Kirill'
let password = 'Xdr%4321'
Auth.signIn(username, password)
    .then(user => {


        Amplify.addPluggable(new AWSIoTProvider({
            aws_pubsub_region: 'us-east-2',
            aws_pubsub_endpoint: 'wss://a73c5uwwia0zy-ats.iot.us-east-2.amazonaws.com/mqtt'
        }))

        let sub = {
            next: data => console.log('Message received', data),
            error: error => console.error(error),
            close: () => console.log('Done')
        }
        PubSub.subscribe('silo-mobile-app').subscribe(sub)

        console.log('Message sent')
        PubSub.publish('silo-mobile-app', { msg: 'Hello to all subscribers!' })




    }).catch(e => {
    console.log(e)
})

Auth.currentCredentials().then((info) => {
    const cognitoIdentityId = info._identityId;
    console.log(cognitoIdentityId);
});

/*
Amplify.addPluggable(new MqttOverWSProvider({
    aws_pubsub_endpoint: 'wss://iot.eclipse.org:443/mqtt'
}))
*/

class App extends Component {
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default withAuthenticator(App, true);
