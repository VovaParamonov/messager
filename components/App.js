import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground } from 'react-native';
import io from 'socket.io-client';
import constants from '../const'

import BottomBar from './BottomBar';
import TopBar from './TopBar';

export default class App extends Component {
  constructor(props) {
    super(props);

      this.state = {
          id: 'none',
          messages: ['test message', 'Еще одно тестовое сообщение']
      };
  }

  api() {
      this.socket = io(`http://${constants.ip}:3000`);
      this.socket.on('getId', id => this.setState({id}));
      this.socket.on('message', msg => {
        this.setState(oldState => {
            let newMessages = oldState.messages;
            newMessages.push(msg);
            return({
                messages: newMessages
            });
        });

      });
  }

  componentDidMount() {
    this.api();
  }

    messageSend = (text) => {
      this.socket.emit('message', {text});
    };

  render() {
    return (
      <ImageBackground source={require('../src/assets/bg-min.png')} style={styles.main} >
          <TopBar id={this.state.id} />
          <View style={styles.msgBox}  >
              {this.state.messages.map(msg=> {
                  const msgStyle = {
                      color: (msg.id === this.state.id)?'#c2c8ff':'#c3c3c3',
                      alignSelf: (msg.id === this.state.id)?'flex-end':'flex-start',
                  };
                  return (
                      <Text key={msg.text} style={msgStyle}>
                          {msg.text}
                      </Text>
                  )
              })}
          </View>
          <BottomBar messageSend={this.messageSend} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        resizeMode: 'repeat'
    },
    id: {
        top: 10,
        left: 10
    },
    msgBox: {
        padding: 10,
        marginTop: 20,
        flex: 1,
        justifyContent: 'flex-end'
    }
});
