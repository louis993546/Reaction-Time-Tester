import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View} from 'react-native';

export class ReactionButton extends Component {
    render() {
        let state = this.props.state.state
        var style;
        var text;
        switch (state) {
            case 'waiting':
                style = styles.trafficLightWaiting
                text = 'Wait......'
                break;
            case 'clickNow':
                style = styles.trafficLightClickNow
                text = 'Click NOW!'
                break;
            case 'restart':
                style = styles.trafficLightRestart
                text = 'Try again'
                break;
            default:
                throw "'" + state + "' is not a valid state"
        }
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={style}>
                    <Text style={styles.trafficSign}>{text}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    trafficLightWaiting: {
        backgroundColor: '#FF0000',
        minHeight: 400,
        justifyContent: 'center',
        alignItems: 'center'
    },
    trafficLightClickNow: {
        backgroundColor: '#00FF00',
        minHeight: 400,
        justifyContent: 'center',
        alignItems: 'center'
    },
    trafficLightRestart: {
        backgroundColor: '#888800',
        minHeight: 400,
        justifyContent: 'center',
        alignItems: 'center'
    },
    trafficSign: {
        color: '#FFFFFF',
        fontSize: 30
    }
});