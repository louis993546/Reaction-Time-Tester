/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
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

  onPressClickMe = () => {
    console.log('button is being click, and this is the current state: ' + JSON.stringify(this.state))
    var stateEnum = this.state.trafficLight.state
    switch(stateEnum) {
      case "waiting":
        // nothing, literally
        break;
      case "clickNow":
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
        break;
      case "restart":
        console.log("clicked when restart")
        setTimeout(() => {
          this.setState(previousState => {
            return { 
              scoreBoard: previousState.scoreBoard, 
              trafficLight: { state: 'clickNow' },
              timeWhenStart: (new Date).getTime()
            };
          });
        }, 2000); //TODO call API instead of hard code timeout
        //TODO move back to waiting state
        this.setState(previousState => {
          return {
            scoreBoard: previousState.scoreBoard,
            trafficLight: { state: 'waiting' },
            timeWhenStart: 0
          };
        });
        break;
      default:
        throw "'" + stateEnum + "' is not a valid state"
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text></Text>
        </View>
        <ScoreBoard scores={this.state.scoreBoard}/>
        <ReactionButton state={this.state.trafficLight} onPress={this.onPressClickMe}/>
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
