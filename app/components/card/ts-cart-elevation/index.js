import React, { Component } from 'react'
import { View , Animated , Easing , StyleSheet } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { width , height } from '../../../styles';

export default function TSCardElevation(props){

  let offset = 0
  let active = false
  let opend = false

  const translateY = new Animated.Value(200)

  const animatedevent = Animated.event([
      {
          nativeEvent : {
                translationY : translateY 
          }
      }
  ],{
      useNativeDriver : true
  })


  function onHandlerStateChange(event){
      if(event.nativeEvent.oldState === State.ACTIVE){
          
          const { translationY } = event.nativeEvent
          
          offset += translationY

          if(translationY > 100){
              opend = true
              props.onPressActive()
          }else{
              translateY.setValue(offset)
              translateY.setOffset(0)
              offset = 0
            //   onActive()
          }

          Animated.timing(translateY,{
              toValue : opend ? 200 : 0,
              duration : 200,
              easing : Easing.bounce,
              useNativeDriver : true
          }).start(() => {
              offset = opend ? 200 : 0
              translateY.setOffset(offset)
              translateY.setValue(0)
          })
        //   translateY.setOffset(offset);
        //   translateY.setValue(0)
      }
  }

  if(props.active){
      console.log("simsim")
    Animated.timing(translateY,{
        toValue : 0,
        duration : 200,
        useNativeDriver : true
    }).start()
    translateY.setOffset(0)
    offset = 0
  }

  return (
      <Animated.View style={{ position : "absolute" , width : width , backgroundColor : "rgba(0,0,0,0.5)" ,opacity : translateY.interpolate({
        inputRange : [0,150],
        outputRange : [1,0.5]
    }) , zIndex : props.active ? 5 : -1 , bottom : 0 , left : 0 , right : 0 , height : height }} >
            {/* <Animated.View style={[styles.backbehind,{  }]} >
        </Animated.View>*/}

        <PanGestureHandler
         onGestureEvent={animatedevent}
         onHandlerStateChange={onHandlerStateChange}
        >
            <Animated.View style={[styles.container,{
                transform : [
                    {
                        translateY : translateY.interpolate({
                            inputRange : [-200,0,200],
                            outputRange : [-50,0,200],
                            extrapolate : "clamp"
                        })
                    }
                ]
            }]}>
                {
                    props.children
                }
            </Animated.View>
        </PanGestureHandler>
        </Animated.View>

   )
}

const styles = new StyleSheet.create({
    container : {
        width : width,
        backgroundColor : "white",
        height : 200,
        position : "absolute",
        bottom : 0,
        left : 0,
        right : 0,
        zIndex : 6
    },
    backbehind : {
        flex : 1,
        zIndex : 3,
        backgroundColor : "rgba(0,0,0,0.6)",
        width : width,
        position : "absolute",
        left : 0,
        right : 0,
        bottom : 0
    }
})