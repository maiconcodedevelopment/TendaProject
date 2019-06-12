import React, { Component } from 'react'
import { View , ViewBase , PushNotification , PushNotificationEventName , Animated , StyleSheet } from "react-native";
import { width } from '../../../styles';

class HeaderCheckout extends React.Component {
  
  // anapScroll = null

  // constructor(props){
  //   super(props)

  //   this.animated = new Animated.Value(0)
  //   this.quantity = 3
  //   this.space = 80
  //   this.marginHorizontal = 10
  //   this.itemWidth = (width / this.quantity) - (this.quantity - 1) * this.space
  // }
    
  
  render() {
    return (
      <View style={styles.container} >
      {/* {
        new Array(this.quantity).fill(0).map((item,index) => {

          //  let animatedLeft = this.animated.interpolate({
          //    inputRange : [ width * (index - 1), width * (index + 1)]
          //  })

          

           return (
             <View style={{ alignItems : "center" , flexDirection : "row" ,   }} >
           {
             index === 0 ? null : <View style={{ width : ( this.space  ) , height : 3 , backgroundColor : "white" , marginHorizontal : this.marginHorizontal  }} ></View>
           }
           <View style={{ height : 50 , width : 50 , borderRadius : 100 , borderColor : "white" , borderWidth : 2, alignItems : "center" , justifyContent : "center"  }} >
             <Text style={{ color : "white" ,  }} >sim</Text>
           </View>
           
           </View>
           )
        })
      } */}
    </View>
    )
  }
}

export default HeaderCheckout;

const styles = StyleSheet.create({
    container : {
      flexDirection : "row" , 
      justifyContent : "center"  ,
      alignItems : "center" , 
      width : width
    }
})
