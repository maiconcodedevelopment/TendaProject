import React, { Component } from 'react'
import { View , ViewBase , TextInput , Text , Animated , StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import TSInput from '../../../../components/input/ts-input';
import ContainerLayout from '../../../../components/containerLayout';
import StatusBar from '../../../../components/header/StatusBar';
import { width } from '../../../../styles';


export default class Transaction extends React.Component {

  anapScroll = null

  constructor(props){
    super(props)

    this.animated = new Animated.Value(0)
    this.quantity = 3
    this.space = 80
    this.marginHorizontal = 10
    this.itemWidth = (width / this.quantity) - (this.quantity - 1) * this.space
  }

  render() {
    return (
        <View>

          
           <View style={styles.containerInput} >
               <TSInput style={{ flex : 1 }} placeholder="cep" />
               <TSInput style={{ flex : 1 }} placeholder="cep" />
           </View>
           <View style={styles.containerInput} >
             <TSInput style={{ flex : 1 }} placeholder="cep" />
           </View>
           <View style={styles.containerInput} >
             <TSInput style={{ flex : 1 }} placeholder="cep" />
           </View>
           <View style={styles.containerInput} >
             <TSInput style={{ flex : 1 }} placeholder="cep" />
           </View>

          {/* <ScrollView
           ref={(anapScroll) => { this.anapScroll = anapScroll }}
           decelerationRate={0}
           onScroll={(event) ={

           }}
          /> */}
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        
    },
    containerInput : {
      flexDirection : "row" , marginHorizontal : 10 , height : 50
    }
})