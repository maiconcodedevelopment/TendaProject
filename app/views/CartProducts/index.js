import React, { Component } from 'react'
import { View , ViewComponent , Text , Image , FlatList , TextComponent , TouchableNativeFeedback , Button , StyleSheet } from "react-native";
import { numberToReal } from "../../helper/formatMoney";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ContainerLayout from '../../components/containerLayout';
import { width, colors } from '../../styles';
import { requestCartProducts, requestCartIncrement } from '../../redux/actions/Users/request';
import { userIncrementProduct } from "../../redux/actions/Users";
import { userAddProduct } from "../../redux/actions/Products";

import { userAddAndRemoveProduct } from "../../redux/actions/Users";
import { requestAddProduct } from '../../redux/actions/Products/request';
import { navigationActionTransaction } from '../../router/actions/Transaction';

import { Icon } from "react-native-elements";

class CartProducts extends Component {



  _deleteProduct = (product) => {

    const { user , userAddProduct , userAddAndRemoveProduct } = this.props

     requestAddProduct(user.id,product.id).then(response => {

         userAddProduct(product.id)
         userAddAndRemoveProduct(response)

     }).catch(errors => {
         console.log(errors)
     })

  }

  _incrementProduct = ({ product,  increment }) => {
    const { user , userIncrementProduct } = this.props
    requestCartIncrement({ iduser : user.id , idproduct : product.id , increment }).then(({ response }) => {

       userIncrementProduct(response)
    }).catch((error) => {
        console.log(error)
    })
  }

  _desencrementProduct({ product , increment }){
    const { user , userIncrementProduct } = this.props
    requestCartIncrement({ iduser : user.id , idproduct : product.id , increment }).then(({ response }) => {

        userIncrementProduct(response)
    }).catch((error) => {
        console.log(error)
    })
  }

  formatPrice(price){
    return price
    //return new Intl.NumberFormat('pt-br',{ style : 'currency', currency : 'BRL' }).format(price)
  }

  onTransaction(){
      this.props.navigation.dispatch(navigationActionTransaction)
  }


  render() {

    const { total , userAddAndRemoveProduct , totalPrice , totalDescont , navigation } = this.props
    const { products } = this.props.user

    const Cart = props => {
        return (
            <TouchableNativeFeedback onPress={props.onPress} >
            <View style={[props.style,styles.card]}>
                <TouchableNativeFeedback onPress={props.onPressDelete} >
                    <View style={styles.cardDelete} >
                       <Image style={{ width : 10,  height : 10 }} source={require("../../assets/icons/png/close_white_small.png")} />
                    </View>
                </TouchableNativeFeedback>
                
                <View style={styles.image}>
                    <Image style={{ width : 80 , height : 80 }} source={props.source} resizeMethod="resize" resizeMode="center" />
                </View>
                <View style={styles.cardDescription} >
                    <Text style={styles.cartTitle} numberOfLines={1} >{ props.title }</Text>
                    
                    <View style={{ flexDirection : "row" , alignItems : "flex-start" , justifyContent : "flex-start" , flex : 1  }} >
                        <Text style={styles.cartPrice} >{ numberToReal(props.price,true)}</Text>
                        <Text style={{ color : colors.lightSlash , alignSelf : "flex-start" }} >{ props.descont }%</Text>
                    </View>
                </View>
                <View style={styles.cartContainerIncrement} >
                    <TouchableNativeFeedback onPress={props.onPressIncrement} >
                        <View style={{ width : 30 , height : 30 , alignItems : "center" , justifyContent : "center" , borderRadius : 100 }} >
                            <Image  style={{ width : 15 , height : 15 }} source={require("../../assets/icons/png/increment.png")} />
                        </View>
                    </TouchableNativeFeedback>
                    <Text style={{ fontSize : 14 , fontWeight : "500" , color : colors.blackDark }} >{props.quantity}</Text>
                    <TouchableNativeFeedback onPress={props.onPressDesencrement} >
                        <View style={{ width : 30 , height : 30 , alignItems : "center" , justifyContent : "center" }} >
                           <Image style={{ width : 15 , height : 15 }} source={require("../../assets/icons/png/desencrement.png")} />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
            </TouchableNativeFeedback>
        )
    }

    return (
        <ContainerLayout style={{ flex : 1 , width , alignItems : "center" , justifyContent : "flex-start"  }} >
             <View style={{ height : 30 }} />

             <View style={{ alignSelf : "flex-start" , paddingTop : 15 , paddingLeft : 20 , paddingBottom : 5 }} >
                <Icon color={"white"} name={"arrow-back"} onPress={() => navigation.goBack()} />
             </View>

             <FlatList
               contentContainerStyle={{ marginHorizontal : 15 , flexGrow : 1 , paddingVertical : 10 }}
               horizontal={false}
               showsVerticalScrollIndicator={false}
               keyExtractor={(item,index) => index.toString()}
               data={products}
               renderItem={({item}) => (
                   <Cart style={{ marginTop : 15 }}
                   quantity={item.quantity}
                   onPress={() => this._incrementProduct({ product :item , increment : true })}
                   onPressIncrement={() => this._incrementProduct({ product : item , increment : true }) }
                   onPressDesencrement={() => this._desencrementProduct({ product : item , increment : false })}
                   onPressDelete={() => this._deleteProduct(item)} 
                   source={{ uri : item.images[0] }} 
                   title={item.name}
                   price={item.price} 
                   descont={item.descont} />
               )} 
             />
             {
                 products.length != 0 ? (
                    <View style={styles.cartBottom} >

                        <View style={styles.containerCalculation}>
                            <View style={{ flexDirection : "row" , justifyContent : "space-between" , width : width * 0.9  }} >
                                <Text style={{ fontSize : 18 , color : "white" , opacity : 0.3 }} >Total</Text>
                                <Text style={{ fontSize : 18 , color : "white" }} >{ numberToReal(totalPrice(),true) }</Text>
                            </View>
                            <View style={{ flexDirection : "row" , justifyContent : "space-between" , width : width * 0.9 }} >
                                <Text style={{ fontSize : 18 , color : "white" , opacity : 0.3 }} >Desconto</Text>
                                <Text style={{ fontSize : 18 , color : "white" }} >{ numberToReal(totalDescont(),true) }</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection : "row"  }} >
                            <TouchableNativeFeedback onPress={() => this.onTransaction()} >
                                <View style={{ flex :1 , marginHorizontal : 20 , marginBottom  : 10 , height : 60 , backgroundColor : colors.lightGreen , flexDirection : "row" , alignItems : "center" , justifyContent : "space-evenly" }} >
                                    <Text style={{ color : "white" , fontWeight : "500" , fontSize : 18 }} >Comprar Produtos</Text>
                                    <Icon color="white" size={30} name="arrow-forward" />
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        
                 </View>
                 ) : null
             }
             
        </ContainerLayout>
      )
  }
}

let mapStateProps = state => ({
    user : state.user,
    total : state.user.total,
    products : state.products,
    totalPrice : () => {
        return state.user.products.reduce((sum,i) => sum + (i.price * i.quantity) ,0)
    },
    totalDescont : () => {
        return state.user.products.reduce((sum,i) => sum + (i.price * i.descont) * i.quantity / 100 ,0)
    }
})

let mapDispatchProps = dispatch => bindActionCreators({ userAddAndRemoveProduct , userAddProduct , userIncrementProduct },dispatch)

export default connect(mapStateProps,mapDispatchProps)(CartProducts)

const styles = StyleSheet.create({
    container : {

    },
    card : {
        height : 80,
        flexDirection : "row",
        backgroundColor : "white",
        flex : 1,
        width : width * 0.9,
        alignItems : "center",
        justifyContent : "flex-start",
        paddingLeft : 55,
        borderRadius : 4
    },
    image : {
        width : 80,
        height : 80,
        marginRight : 10
    },
    cardDelete : {
        position : "absolute",
        left : 0,
        top : 0,
        backgroundColor : colors.lightSlash,
        height : 80,
        width : 50,
        borderRadius : 4,
        zIndex : 4,
        alignItems : "center",
        justifyContent : "center"
    },
    cardDescription : {
         paddingTop : 5,
         height : 80,
         flex : 1,
         overflow : "hidden",
         flexDirection : "column",
         justifyContent : "flex-start",
         alignItems : "flex-start"
    },
    cartTitle : {
        fontSize : 14,
        fontWeight : "400"
    },
    cartPrice : {
        fontSize : 18,
        fontWeight : '400',
        marginRight : 5
    },
    cartContainerIncrement : {
        width : 90,
        height : 80,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-around",
        marginLeft : "auto"
    },
    cartBottom : {
        flexDirection : "column",
        alignItems : "center",
        justifyContent : "center"
    },
    containerCalculation : {
        flexDirection : "column",
        alignItems : "center",
        justifyContent : "flex-start",
        paddingHorizontal : 25,
        paddingTop : 25,
        marginBottom : 15
    },
    buttonCheckout : {
        flex: 1,
        textTransform: "capitalize",
        fontFamily: "Roboto",
        height: 60
    }
})