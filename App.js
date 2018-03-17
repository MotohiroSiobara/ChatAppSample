import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from './config/firebase';
const db = firebase.database();
const refMessages = db.ref('messages');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentWillMount() {
    this.setState({
      messages: [{
        _id: 1,
        text: "ようこそチャットの世界へ",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        }
      }]
    });

    refMessages.on('child_added', snapshot => {
      const val = snapshot.val();
      this.setState({
        messages: [{_id: snapshot.key, text: val.text, user: { _id: val.userId }, createdAt: val.createdAt}, ...this.state.messages]
      });
    });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }

  onSend(messages = []) {
    refMessages.push({
      text: messages[0].text,
      userId: 1,
      createdAt: messages[0].createdAt
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
