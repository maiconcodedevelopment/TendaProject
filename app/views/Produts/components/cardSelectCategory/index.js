import React from "react"
import { View , Text , Image , TouchableNativeFeedback ,StyleSheet } from "react-native";
import { colors } from "../../../../styles";

class CardSelectCategory extends React.Component{
    
    render(){

        const { icon , name , id ,onTouchSelectCategory} = this.props

        const activeCategory = {
            backgroundColor : this.state.activeCategory  ? colors.lightPurple : colors.lightGreen
        }

        return(
            <TouchableNativeFeedback onPress={onTouchSelectCategory(id)} >
                <View style={[styles.cardSelectCategory,activeCategory]} >
                   <Image style={{ width : 25 , height : 25 }}  source={icon}  />
                   <Text style={{ color : "white" }} >{ name }</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    cardSelectCategory : {
        width : 40,
        height : 80,
        flexDirection: "column",
        alignItems : "center",
        justifyContent : "center"
    },
})