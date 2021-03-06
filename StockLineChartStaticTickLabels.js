/*
Copyright 2016 Capital One Services, LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

SPDX-Copyright: Copyright (c) Capital One Services, LLC
SPDX-License-Identifier: Apache-2.0
*/

'use strict'

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import StockLine from './StockLine';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class StockLineChartStaticTickLabels extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `StockLine - Static Labels`,
  });
  render() {
    let data = [
      [{
        "x": 0,
        "y": 477
      }, {
        "x": 2,
        "y": 771
      }, {
        "x": 3,
        "y": 731
      }, {
        "x": 4,
        "y": 582
      }, {
        "x": 5,
        "y": 405
      }, {
        "x": 6,
        "y": 100
      }]
    ]
    let options = {
      width: Dimensions.get('window').width - 100,
      height: Dimensions.get('window').height - 200,
      color: '#2980B9',
      margin: {
        top: 10,
        left: 35,
        bottom: 30,
        right: 10
      },
      animate: {
        type: 'delayed',
        duration: 200
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        tickValues: [
          {value:'JAN'},
          {value:'FEB'},
          {value:'MAR'},
          {value:'APR'},
          {value:'MAY'},
          {value:'JUN'},
          {value:'JUL'},
          {value:'AUG'},
          {value:'SEP'},
          {value:'OCT'},
          {value:'NOV'},
          {value:'DEC'}
        ],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    return (
       <ScrollView  
          horizontal={true}
          scrollEnabled={true}
        >

      <View style={styles.container}>
        <StockLine data={data} options={options} xKey='x' yKey='y' />
      </View>
       </ScrollView>
    )
  }
}

export default StockLineChartStaticTickLabels;
