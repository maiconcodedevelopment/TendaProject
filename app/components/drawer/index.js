import React from "react";
import { View, Image , Text, TouchableNativeFeedback ,  StyleSheet, ScrollView } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import { LinearGradient } from "expo";
import { colors } from "../../styles";
import { navigationActionCartProducts } from "../../router/actions/CartProducts";

class Sidebar extends React.Component{


  render(){
    const { user , navigation } = this.props

    console.log(user)
    console.log(this.props)

    return(
      <View style={styles.container}>
        <LinearGradient colors={[ "#560a5f" ,"#560a5f" ]} style={{ alignItems : "center" , justifyContent : "flex-start" , paddingLeft : 25 , flexDirection : "row" , height : 180 }} >
           <View style={{ width : 80 , height : 80 , backgroundColor : "white" , marginRight : 25 , borderRadius : 100 , alignItems : "center" , justifyContent : "center" }} >
            <Text style={{ fontWeight : "500" , fontSize : 35 }} >
              { user.username[0].toUpperCase() }
            </Text>
           </View>
           <Text style={{ color : "white" , fontWeight : "500" }} >{user.username}</Text>
        </LinearGradient>
        <ScrollView>
           <TouchableNativeFeedback onPress={() => navigation.dispatch(navigationActionCartProducts) } >
           <View style={{ flexDirection : "row" , alignItems : "center" , justifyContent  : "space-between" , paddingHorizontal : 20 , marginTop : 15 }} >
              <Text style={{ fontWeight : "500" }} >Produto Carrinho</Text>
              <Image source={require('../../assets/icons/png/car_love.png')} style={{ width : 25, height : 25 }}  />
           </View>
           </TouchableNativeFeedback>
        </ScrollView>
      </View>
    )
  }

}

let mapStateProps = (state) => ({
  ...state
})

export default connect(mapStateProps)(Sidebar)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
