import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

export default class BottomBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
        }
    }

    messageSend = () => {
        this.props.messageSend(this.state.message);
        this.setState({message: ''});
    };

    render() {
        return (
            <View style={styles.bottomBar}>
                <TextInput
                    style={styles.msgInput}
                    onChangeText = {text => this.setState({message:text})}
                    value = {this.state.message}
                    onSubmitEditing = {this.messageSend}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bottomBar: {
        width: '100%',
        bottom: 0,
        padding: 10,
        backgroundColor: '#262626',
        // alignContent: 'center',

    },
    msgInput: {
        borderWidth: 0.9,
        borderRadius: 20,
        backgroundColor: '#484848',
        color: '#c3c3c3',
        borderColor: '#2d2d2d',
        width: '99%',
        alignSelf: 'center'
    }
});