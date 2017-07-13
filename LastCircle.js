import React,{Component} from 'react'
import {Text as ReactText, PanResponder, ScrollView, Dimensions}  from 'react-native'
import Svg,{ G, Path, Rect, Text, Circle, Line } from 'react-native-svg'
import { Colors, Options, cyclic, fontAdapt } from './util'
import Axis from './Axis'
import _ from 'lodash'

export default class LastCircle extends Component {

  constructor(props) {
    super(props)
    this.state = {x:0, y:0, dy: 0}
  }


  color(i) {
    let color = this.props.options.color
    if (!_.isString(this.props.options.color)) color = color.color
    let pallete = this.props.pallete || Colors.mix(color || '#9ac7f7')
    return Colors.string(cyclic(pallete, i))
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: () => {
        console.log('-------onPanResponderGrant------')
      },
      onPanResponderMove: (evt, gs) => {
        this.setState({y: gs.dy+this.state.dy})
        let touches = evt.nativeEvent.touches;
                if (touches.length == 2) {
                    let touch1 = touches[0];
                    let touch2 = touches[1];
                    console.log("touch 1 : "+touch1+" touch 2 : "+touch2)
                  }
                  else
                  {
                     console.log("touch length : "+touches.length)

                  }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gs) => {
        let dy1 = gs.dy+this.state.dy;
        this.setState({dy: dy1})//not set to dy1
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming
        // the JS responder. Returns true by default. Is currently only supported on
        // android.
        return true;
      }
    })
  }


  render() {

	const { chart, options } = this.props

    let accessor = function (key) {
      return function (x) {
        return x[key]
      }
    }


    let size = chart.curves[0].item.length;
    let circles= _.map(chart.curves[0].item, function (item, i) {
     console.log("i : "+i);
     console.log("size : "+size);
     if(size == i+1) {
          
      let py1 = chart.yscale(item.y)+this.state.y;

      return <G {...this._panResponder.panHandlers}>
      
        <Line x1={0} y1={py1} x2={chart.xscale(item.x)} y2={py1} stroke="black" strokeWidth="2"/>    
      <Circle
             cx={chart.xscale(item.x)} cy={py1} r="10" fill="orange" onPress={() => console.log('Press on Circle')}/> 
      </G> 


    }
    else {
        return <Circle
          cx={chart.xscale(item.x)} cy={chart.yscale(item.y)} r="10" fill="orange" onPress={() => console.log('Press on Circle')}/>
    }
    }.bind(this))

    let returnValue = 
                  <G x={0} y={0}>
                        { circles }
                  </G>

    return returnValue
  }

}
