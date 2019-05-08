import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class TopBottom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.TopBar} >
                <Text style={styles.id} > Hello, your id: {this.props.id} </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    TopBar: {
        top: 0,
        padding: 10,
        backgroundColor: "#262626",
        width: '100%',
        justifyContent: 'center'
    },
    id: {
        color: '#959595',
    }
});