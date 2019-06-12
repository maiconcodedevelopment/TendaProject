import React, { Component } from 'react'
import { View , TextInput , Image , EventEmitter , StyleSheet  } from "react-native";
import { colors } from '../../../styles';

import { Icon } from "react-native-elements";

export default class TSInput extends Component {


  onChangeText = () => {

  }

  onValidation = (value,exp) => {
    return new RegExp(exp,"g").test(value)
  }

  render() {

    const { style , placeholder , validation , value , match , onChangeText , TextColor , onBlur } = this.props

    return (
        <View style={[styles.container,style ]} >

            <TextInput
              {...this.props}
              underlineColorAndroid={colors.lightSlash}
              placeholder={placeholder}
              laceholderTextColor="white"
              value={value}
              onChangeText={onChangeText}
              onBlur={onBlur}
              style={[styles.input,style]}/>
             
            {
              this.onValidation(value,match) ? <View style={styles.icon} >
                              <Image
                                 source={require("../../../assets/icons/png/done_green.png")}
                                 style={{ width : 25 , height : 25 , resizeMode : "contain" }} />
                           </View> : null
            }

           

        </View>

    )
  }
}


const styles = StyleSheet.create({
    container : {
      height : 55,
    },
    input : {
        flex : 1 ,   color : "white" , paddingHorizontal : 10 , paddingRight : 30
    },
    icon : {
      position : "absolute" ,
      right : 0,
      height : 55,
      alignItems : "center",
      justifyContent : "center"
    }
})