'use strict'

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Scatterplot } from 'react-native-pathjs-charts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class ScatterplotChart extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Scatterplot - Basic`,
  });
  render() {
    let data = [
      [{
        "title": "Amapá",
        "rating": 10,
        "episode": 10
      }, {
        "title": "Santa Catarina",
        "rating": 20,
        "episode": 20
      }, {
        "title": "Minas Gerais",
        "rating": 30,
        "episode": 30
      }]
    ]

    let options = {
      width: 290,
      height: 290,
      r: 2,
      margin: {
        top: 20,
        left: 40,
        bottom: 30,
        right: 30
      },
      fill: "#f09e3e",
      stroke: "#f09e3e",
      animate: {
        type: 'delayed',
        duration: 200
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        fill: '#bec0c1'
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: false,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#bec0c1'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: false,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#bec0c1'
        }
      }
    }

    return (
      <View style={styles.container}>
        <Scatterplot data={data} options={options} xKey="episode" yKey="rating" />
      </View>
    )
  }
}

export default ScatterplotChart;