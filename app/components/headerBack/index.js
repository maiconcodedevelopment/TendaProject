import React from "react"
import { View , Image , Text , TextBase , TextInputComponent , StyleSheet , TouchableOpacity } from "react-native"
import { statusBar } from "../../styles";

export class HeaderBack extends React.Component{
    render(){

        const { navigation } = this.props

        return(
            <View style={styles.container}>
               <View style={{ height : 80 }} >
               </View>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                   <View style={{ width : 35 , height : 35 , alignItems : 'center' , justifyContent : "center" }} >
                     <Image style={{ width : 18 , height : 18 }} source={require("../../assets/icons/png/icon_back.png")} />
                   </View>
               </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flexDirection : "row",
        alignItems : "center",
        position : "absolute",
        justifyContent : "flex-start",
        padding : 10,
        top : 0,
        left : 0,
        zIndex : 5
    }
})