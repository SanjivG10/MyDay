import React from "react";
import { PanResponder, Text, View,TouchableOpacity } from 'react-native';
import {Icon} from 'native-base'


const styles ={
    textStyle:{ 
        padding:5
    }
}


export default class DraggableText extends React.Component
{

    state = {
        angle : 0, 
        textActive : false
    }


    borderStyle = {
        borderWidth: 1 , 
        borderColor: '#000'
    }

    _panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
  
        onPanResponderGrant: (evt, gestureState) => {
          // The gesture has started. Show visual feedback so the user knows
          // what is happening!
          // gestureState.d{x,y} will be set to zero now
          this.setState({ textActive: !this.state.textActive}) 
        },
        onPanResponderMove: (evt, gestureState) => {
            
          // The most recent move distance is gestureState.move{X,Y}
          // The accumulated gesture distance since becoming responder is
          // gestureState.d{x,y}
          this.props.action(gestureState.moveX, gestureState.moveY)
          this.setState({
            rotateInitialX : gestureState.moveX, 
            rotateInitialY: gestureState.moveY
          })

        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded
        },
        onPanResponderTerminate: (evt, gestureState) => {
          // Another component has become the responder, so this gesture
          // should be cancelled
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      });


      render()
      {
          return(
            <View {...this._panResponder.panHandlers} style={[this.props.style]} >
                    <Icon  name='undo' type="FontAwesome"  style= {{alignSelf: 'center', marginBottom: 20, fontSize: 20}} /> 
                    <Text style={[styles.textStyle, this.state.textActive ? this.borderStyle : {}]}>
                        Hello
                    </Text>
            </View>
            )
}
    
}