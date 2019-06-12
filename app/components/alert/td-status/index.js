import React, { Component } from 'react'
import { View , Text , Animated , Easing, Platform , StyleSheet } from "react-native";
import { colors } from '../../../styles';

import { Icon } from "react-native-elements"

export default function TDStatus(props) {

    const sizeHeight = 50
    const animated = new Animated.Value(0)


    if(props.active){

        Animated.timing(animated,{
            toValue :  1,
            duration : 500,
            easing : Easing.bounce,
            useNativeDriver : Platform.OS === "android"
        }).start(() => {
            setTimeout(() => {
                animated.setOffset(-sizeHeight)
                animated.setValue(0)
                props.callbackActive()
            },2000)
        })
    }

    
    return (
        <Animated.View style={[styles.container,{
            transform : [
                {
                    translateY : animated.interpolate({
                        inputRange : [0,1],
                        outputRange : [sizeHeight,0],
                        extrapolate : "clamp"
                    })
                }
            ]
        }]} >
            <View style={{ flex : 1 , height : sizeHeight , paddingHorizontal : 15 , flexDirection : "row", alignItems : "center" , justifyContent : "space-between" }} >
                <Text style={{ color : "white" , fontWeight : "500" , fontSize : 16 }} >Produto Adicionado no Carrinho</Text>
                <Icon name="add-shopping-cart" color="white"  />
            </View>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    container : {
        zIndex : 20,
        position : "absolute" , 
        bottom : 0,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : 'center',
        backgroundColor : "#2ff73d"
    }
})