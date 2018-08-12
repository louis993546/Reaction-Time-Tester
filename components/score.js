import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';

export class Score extends Component {
    render() {
        return (
            <View style={styles.scoreContainer}>
                <Text>{this.props.name}</Text>
                <Text>{this.props.milliseconds}ms</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scoreContainer: {
        borderColor: '#000000',
        borderWidth: 1,
        flex: 1,
        alignItems: 'center'
    }
});