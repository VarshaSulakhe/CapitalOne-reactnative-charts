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

import React,{Component} from 'react'
import {Text as ReactText, PanResponder, ScrollView, Dimensions}  from 'react-native'
import Svg,{ G, Path, Rect, Text, Circle, Line } from 'react-native-svg'
import { Colors, Options, cyclic, fontAdapt } from './util'
import Axis from './Axis'
import _ from 'lodash'

export default class LineChart extends Component {

  constructor(props, chartType) {
    super(props)
    this.chartType = chartType
    this.state = {x:0, y:0, dy: 0}
 

  }


  getMaxAndMin(chart, key, scale, chartMin, chartMax) {
    let maxValue
    let minValue
    _.each(chart.curves, function (serie) {
      let values = _.map(serie.item, function (item) {
        return item[key]
      })

      let max = _.max(values)
      if (maxValue === undefined || max > maxValue) maxValue = max
      let min = _.min(values)
      if (minValue === undefined || min < minValue) minValue = min

      maxValue = chartMax > maxValue ? chartMax : maxValue
      minValue = chartMin < minValue ? chartMin : minValue
    })

    return {
      minValue: minValue,
      maxValue: maxValue,
      min: scale(minValue),
      max: scale(maxValue)
    }
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
        console.log("onPanResponderRelease "+gs.dx + ' ' + gs.dy)
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
        console.log("pan : gs.dx"+gs.dx + ' gs.dy ' + gs.dy + ' this.state.y ' + this.state.y+ ' this.state.dy '+this.state.dy)
        let dy1 = gs.dy+this.state.dy;
        console.log("pan old: x "+this.state.x + ' y ' + this.state.y + ' dy ' + this.state.dy)
        this.setState({dy: dy1})//not set to dy1
        console.log("pan new: x "+this.state.x + ' y ' + this.state.y + ' dy ' + this.state.dy)
        console.log("dy1 : "+dy1);
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

   
    const noDataMsg = this.props.noDataMessage || 'No data available'
    if (this.props.data === undefined) return (<ReactText>{noDataMsg}</ReactText>)

  
    let options = new Options(this.props)

    let accessor = function (key) {
      return function (x) {
        return x[key]
      }
    }

    let chart = this.chartType({
      data: this.props.data,
      xaccessor: accessor(this.props.xKey),
      yaccessor: accessor(this.props.yKey),
      width: options.chartWidth,
      height: options.chartHeight,
      closed: false,
      min: options.min,
      max: options.max

    })
 
    let chartArea = {
      x:this.getMaxAndMin(chart,this.props.xKey,chart.xscale),
      y:this.getMaxAndMin(chart,this.props.yKey,chart.yscale,options.min,options.max),
      margin:options.margin
    }

    let showAreas = typeof(this.props.options.showAreas) !== 'undefined' ? this.props.options.showAreas : true;
    let strokeWidth = typeof(this.props.options.strokeWidth) !== 'undefined' ? this.props.options.strokeWidth : '1';
    let lines = _.map(chart.curves, function (c, i) {
      console.log("Lines");

      console.log(c.line.path.print());

      return <Path key={'lines' + i} d={ c.line.path.print() } stroke={ this.color(i) } strokeWidth={strokeWidth} fill="none" onPress={() => console.log('Press on path')}/>
    }.bind(this))
    let areas = null
    let size = chart.curves[0].item.length;
    let circles= _.map(chart.curves[0].item, function (item, i) {
     console.log("i : "+i);
     console.log("size : "+size);
     if(size == i+1) {
          
      /*if(this.state.start == false) {
        this.state.x = chart.xscale(item.x);
        this.state.y = chart.yscale(item.y);
        this.state.start = true;
        console.log("changing inside start ");        
      }*/
      console.log("x new value "+this.state.x);
      console.log("x xscale value "+chart.xscale(item.x));
      console.log("y new value "+chart.yscale(item.y)+" y "+this.state.y+" dy "+this.state.dy);

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

    if(showAreas){
      areas = _.map(chart.curves, function (c, i) {
        return <Path key={'areas' + i} d={ c.area.path.print() } fillOpacity={0.5} stroke="none" fill={ this.color(i) }/>
      }.bind(this))
    }

    let textStyle = fontAdapt(options.label)
    let regions
    if(this.props.regions != 'undefined') {
      let styling = typeof(this.props.regionStyling) != 'undefined' ?
        this.props.regionStyling : {}
      let labelOffsetAllRegions = typeof(styling.labelOffset) != 'undefined' ?
        styling.labelOffset : {}

      regions = _.map(this.props.regions, function (c, i) {
        let x, y, height, width, y1, y2, labelX, labelY

        let labelOffset = typeof(c.labelOffset) != 'undefined' ?
          c.labelOffset : {}
        let labelOffsetLeft = typeof(labelOffsetAllRegions.left) != 'undefined'
          ? (typeof(labelOffset.left) != 'undefined'
              ?  labelOffset.left : labelOffsetAllRegions.left) : 20
        let labelOffsetTop = typeof(labelOffsetAllRegions.top) != 'undefined'
          ? (typeof(labelOffset.top) != 'undefined'
              ?  labelOffset.top : labelOffsetAllRegions.top) : 0
        let fillOpacity = typeof(styling.fillOpacity) != 'undefined'
          ? (typeof(c.fillOpacity) != 'undefined'
              ?  c.fillOpacity : styling.fillOpacity) : 0.5

        y1 = chart.yscale(c.from)
        y2 = chart.yscale(c.to)

        x = 0
        y = y1
        height = (y2 - y1)
        width = chartArea.x.max

        labelX = labelOffsetLeft
        labelY = y2 + labelOffsetTop

        let regionLabel = typeof(c.label) != 'undefined' ? (
          <Text fontFamily={textStyle.fontFamily}
                fontSize={textStyle.fontSize}
                fontWeight={textStyle.fontWeight}
                fontStyle={textStyle.fontStyle}
                fill={textStyle.fill}
                textAnchor="middle"
                x={labelX}
                y={labelY}>{ c.label }</Text>
        ) : null

        return (
          <G key={'region' + i}>
            <Rect key={'region' + i} x={x} y={y} width={width} height={height}
              fill={c.fill} fillOpacity={fillOpacity}/>
            {regionLabel}
          </G>
        )
      }.bind(this))
    }

//    let xlength = options.axisX.tickValues.length || this.props.data[0].length;
let xlength = 10;
    console.log(`data length ${xlength}`);
    let mx = chart.xscale(xlength) + (chart.xscale(xlength) - chart.xscale(xlength-1));

    console.log(`mx value is ${mx}`);
    let returnValue = 
     <ScrollView  
          horizontal={true}
          scrollEnabled={true}
        >
                   <Svg width={mx} height={options.height}>
                  <G x={options.margin.left} y={options.margin.top}>
                        { regions }
                        { areas }
                        { lines }
                        { circles }
                      <Axis key="x" scale={chart.xscale} options={options.axisX} chartArea={chartArea} mx={mx} />
                      <Axis key="y" scale={chart.yscale} options={options.axisY} chartArea={chartArea} />
                  </G>
              </Svg>
      </ScrollView>
          
           

    return returnValue
  }

  calcStepSize(range, targetSteps)
  {
    const tempStep = range / targetSteps
    const mag = Math.floor(Math.log(tempStep) /  Math.log(10))
    const magPow = Math.pow(10, mag)
    let magMsd = Math.round(tempStep / magPow + 0.5)

    if (magMsd > 5.0)
      magMsd = 10.0
    else if (magMsd > 2.0)
      magMsd = 5.0
    else if (magMsd > 1.0)
      magMsd = 2.0

    return magMsd * magPow
  }
}
