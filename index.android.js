import React from 'react';
import {
  AppRegistry,
  Text,
  Button,
  StyleSheet,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ScatterplotChart from './ScatterplotChart';
import StocklineChart from './StockLineExample';
import StockLineChartStaticTickLabels from './StockLineChartStaticTickLabels';
import StockLineChartDynamicTickLabels  from './StockLineChartDynamicTickLabels';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <Button
        style={styles.container}
        title="Scatter Plot Chart"
        onPress={() =>
          navigate('SChart')
        }
      />

      <Button
        style={styles.container}
        title="Stockline chart"
        onPress={() =>
          navigate('StChart')
        }
      />
      <Button
        style={styles.container}
        title="Stocklinedynamic chart"
        onPress={() =>
          navigate('StdChart')
        }
      />
      <Button
        style={styles.container}
        title="Stocklinestatic chart"
        onPress={() =>
          navigate('StsChart')
        }
      />

      <Button
        style={styles.container}
        title="Reload react native"
        onPress={() => {

          return cosole.warn("Hi");
        }
        }
      />

      </View>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  SChart: { screen: ScatterplotChart },
  StChart: { screen: StocklineChart },
  StdChart: { screen: StockLineChartDynamicTickLabels },
  StsChart: { screen: StockLineChartStaticTickLabels }
  
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  viewContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);