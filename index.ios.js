'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AppRegistry } from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    borderColor: 'red',
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10,
    width: 100,
    height: 100
  }
});

var Sample = React.createClass({
  render: function() {
    console.warn("test warning here");
    return (
      <View style={styles.container}>
          <Text>Hello</Text>
      </View>
    );
  }
});

AppRegistry.registerComponent('Sample', function() {
  return Sample;
});