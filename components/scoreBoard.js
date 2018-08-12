import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import {Score} from './score.js'

export class ScoreBoard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.scoreList}>
                    <Score name='1' milliseconds={this.props.scores.scores[0].score}/>
                    <Score name='2' milliseconds={this.props.scores.scores[1].score}/>
                    <Score name='3' milliseconds={this.props.scores.scores[2].score}/>
                    <Score name='4' milliseconds={this.props.scores.scores[3].score}/>
                    <Score name='5' milliseconds={this.props.scores.scores[4].score}/>
                </View>
                <Text>Average = TODO</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scoreList: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center'
    }
});