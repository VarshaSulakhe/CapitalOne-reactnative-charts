     if(size == i+1) {
          
      if(this.state.start == false) {
        this.state.x = chart.xscale(item.x);
        this.state.y = chart.yscale(item.y);
        this.state.start = true;
        console.log("changing inside start ");        
      }
      console.log("x new value "+this.state.x);
      console.log("y new value "+this.state.y);

      return <G {...this._panResponder.panHandlers}>

      <Line x1={0} y1={this.state.y} x2={chart.xscale(item.x)} y2={this.state.y} stroke="black" strokeWidth="2"/>    
      <Circle
             cx={chart.xscale(item.x)} cy={this.state.y} r="10" fill="orange" onPress={() => console.log('Press on Circle')}/>

      </G> 


    }