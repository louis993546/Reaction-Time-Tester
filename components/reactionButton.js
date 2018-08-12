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
                text = 'Click me to try again'
                break;
            case 'invalid':
                style = styles.trafficLightInvalid
                text = 'Too early, click me to try again'
                break;
            default:
                throw "'" + state + "' is not a valid state"
        }
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={[styles.trafficLightBase, style]}>
                    <Text style={styles.trafficSign}>{text}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    trafficLightBase: {
        minHeight: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    trafficLightWaiting: {
        backgroundColor: '#FF0000'
    },
    trafficLightClickNow: {
        backgroundColor: '#00FF00'
    },
    trafficLightRestart: {
        backgroundColor: '#AAAA00'
    },
    trafficLightInvalid: {
        backgroundColor: '#CC2200'
    },
    trafficSign: {
        color: '#FFFFFF',
        fontSize: 30
    }
});