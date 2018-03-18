import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends Component {
  render() {
    return (
      <GiftedChat
        messages={this.props.messages}
        onSend={messages => this.props.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
