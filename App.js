/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert} from 'react-native';
import {ScoreBoard} from './components/scoreBoard.js'
import {ReactionButton} from './components/reactionButton.js'

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props)
    this.state = {
      scoreBoard: {
        scores: [
          {score: 0},
          {score: 0},
          {score: 0},
          {score: 0},
          {score: 0},
        ]
      },
      trafficLight: {state: 'restart'},
      timeWhenStart: 0
    }
  }

  onPressInstruction = () => {
    Alert.alert(
      'Instruction',
      '1. When the button is red, wait.\n2. When the button is green, press as fast as possible.\n3. When the button is yellow, press again to start the next round',
      [{text: 'Got it!', onPress: () => console.log('alert dismissed')}],
      { cancelable: true }
    )
  }

  onPressWhenWaiting = () => {
    // mark this round as invalid
    this.setState(previousState => {
      return {
        scoreBoard: previousState.scoreBoard,
        trafficLight: { state: 'invalid' },
        timeWhenStart: 0
      }
    })
  }

  onPressWhenClickNow = () => {
    //determin the new score
    var timeNow = (new Date).getTime()
    var diff = timeNow - this.state.timeWhenStart

    //set state to restart, add a new score
    this.setState(previousState => {
      var newScoreBoard = previousState.scoreBoard.scores.slice(1)
      newScoreBoard.push({score: diff})
      return {
        scoreBoard: { scores: newScoreBoard },
        trafficLight: { state: 'restart' },
        timeWhenStart: 0
      }
    })
  }

  onPressWhenRestart = () => {
    fetch('https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new')
      .then((response) => response.text()._55)
      .then((seconds) => seconds * 1000)
      .then((ms) => {
        setTimeout(() => {
          if (this.state.trafficLight.state == 'waiting'){
            this.setState(previousState => {
              return {
                scoreBoard: previousState.scoreBoard,
                trafficLight: {state: 'clickNow'},
                timeWhenStart: (new Date).getTime()
              };
            });
          }
        }, ms);
      })

    //move back to waiting state
    this.setState(previousState => {
      return {
        scoreBoard: previousState.scoreBoard,
        trafficLight: {
          state: 'waiting'
        },
        timeWhenStart: 0
      };
    });
  }

  onPressWhenInvalid = () => {
    //the behaviour is exactly the same as restart
    this.onPressWhenRestart()
  }

  onPressReactionButton = () => {
    console.log('button is being click, and this is the current state: ' + JSON.stringify(this.state))
    var stateEnum = this.state.trafficLight.state
    switch(stateEnum) {
      case "waiting":
        this.onPressWhenWaiting()
        break;
      case "clickNow":
        this.onPressWhenClickNow()
        break;
      case "restart":
        this.onPressWhenRestart()
        break;
      case "invalid":
        this.onPressWhenInvalid()
        break;
      default:
        throw "'" + stateEnum + "' is not a valid state"
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Instruction" onPress={this.onPressInstruction}/>
        <ScoreBoard scores={this.state.scoreBoard}/>
        <ReactionButton state={this.state.trafficLight} onPress={this.onPressReactionButton}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  }
});
