import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView,View, ImageBackground } from 'react-native';
import io from 'socket.io-client';
import constants from '../const'

import BottomBar from './BottomBar';
import TopBar from './TopBar';

export default class App extends Component {
  constructor(props) {
    super(props);

      this.state = {
          id: 'none',
          messages: [
              {text:'test_msg1', id:'none'},
              {text:'test_msg2', id:'none'},
              {text:'test_msg3', id:'none'},
              {text:'test_msg4', id:'none'},
              {text:'test_msg5', id:'none'},
              {text:'test_msg6', id:'none'},
              {text:'test_msg7', id:'none'},
              {text:'test_msg8', id:'none'},
              {text:'test_msg9', id:'none'},
              {text:'test_msg10', id:'none'},
              {text:'test_msg11', id:'none'},
              {text:'test_msg12', id:'none'},
              {text:'test_msg13', id:'none'},
              {text:'test_msg14', id:'none'},
              {text:'test_msg15', id:'none'},
          ]
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
          <ScrollView style={styles.msgBoxWrapper}  >
              <View style={styles.msgBox}>
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
          </ScrollView>
          <BottomBar messageSend={this.messageSend} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        resizeMode: 'repeat',

    },
    id: {
        top: 10,
        left: 10
    },
    msgBoxWrapper: {
        height: '100%',
        flex: 1
    },
    msgBox: {
        padding: 10,
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        bottom: 0,
    }
});
