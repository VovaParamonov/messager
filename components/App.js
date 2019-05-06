import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import io from 'socket.io-client';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.socket = io('http://192.168.0.107:3000');
    this.socket.on('getId', id => this.setState({id}));
  }

  state = {
    id: 'none'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> Hello, your id: {this.state.id} </Text>
      </View>
    );
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
