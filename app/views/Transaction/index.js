import React, { Component } from 'react'
import { View , ViewBase , ScrollView , TextInput , Text , Image , TouchableOpacity , TouchableNativeFeedback , Animated , ImageBackground , SectionList  , Picker , ActivityIndicator ,  StyleSheet , Platform } from "react-native";
import { numberToReal } from "../../helper/formatMoney";
import ContainerLayout from '../../components/containerLayout';
import { width, colors } from '../../styles';
import StatusBar from '../../components/header/StatusBar';
import TSInput from '../../components/input/ts-input';

import { Icon, Button } from "react-native-elements";
import TSCardElevation from '../../components/card/ts-cart-elevation';
import { url } from '../../config/requestConfig';

import { connect } from "react-redux";
import { LiteCreditCardInput } from "react-native-credit-card-input";

import { removeProductsAll } from "../../redux/actions/Products";
import { userClearProducts  } from "../../redux/actions/Users/index";

import { requestAdressSearch, requestTransactionFreightCalculation, requestRegisterCardCredit, requestCheckout } from '../../redux/actions/Users/request';
import {  navigationAppAction } from "../../router/actions/App";
import { bindActionCreators } from 'redux';


function TSReloadApplication(props){

  let animated = new Animated.Value(0)
  let activeZindex = false

  if(props.active){

    activeZindex = true

    Animated.timing(animated,{
      toValue : 1,
      duration : 500,
      useNativeDriver : Platform.OS == "android",
    }).start()

  }else{
    Animated.timing(animated,{
      toValue : 0,
      duration : 500,
      useNativeDriver : Platform.OS == "android",
    }).start(() => {
      activeZindex = false
    })
  }

  let opacityAnimated = animated.interpolate({
    inputRange : [0,1],
    outputRange : [0,1],
    extrapolate : "clamp",
  })

  return(
    <Animated.View style={[styleRelad.container,{ opacity : opacityAnimated , zIndex : activeZindex ? 10 : -1 }]} >
      <View style={styleRelad.containerLoad} >
        <Text style={styleRelad.title} >Carregando</Text>
        <ActivityIndicator color={colors.slashStrong} />
      </View>
    </Animated.View>
  )
}

const styleRelad = StyleSheet.create({
  container : {
    width : '100%',
    height : '100%',
    position : "absolute",
    left : 0,
    top : 0,
    backgroundColor : "rgba(0,0,0,0.5)",
    flex : 1,
    alignItems : "center",
    justifyContent : "center"
  },
  containerLoad : {
    paddingHorizontal : 10,
    height : 65,
    backgroundColor : "rgba(255,255,255,1)",
    flexDirection : "row",
    alignItems : "center",
    justifyContent : "space-around",
    borderRadius : 4
  },
  title : {
    fontSize : 18,
    fontWeight : "500",
    color : colors.slashStrong,
    marginRight : 5
  }
})


function ButtonNext(props){

  return (
    <TouchableOpacity disabled={!props.active} onPress={props.active ? props.onPress : () => {  }} >
        <View style={{ width : 80 , height : 65, borderRadius : 4, marginHorizontal : 15 , backgroundColor : props.active ? colors.lightGreen : "gray" , alignItems : "center" , justifyContent : "center" }} >
            <Icon name="arrow-forward" size={40} color="white" />
        </View>
     </TouchableOpacity>
  )
}

function TSCheck(props){


  return(
    <View style={{ flexDirection : "row" }} >

     <View style={{ flex : 1 , paddingVertical : 15 , paddingHorizontal : 20, flexDirection : "row" , alignItems : "center" }} >
     <TouchableOpacity onPress={props.onPress} style={{ flex : 1 , flexDirection : "row" , alignItems : "center" , justifyContent : "space-between" }} >

       <View style={{ width : 30 , height : 30 , borderRadius : 100 , borderColor : colors.lightSlash , borderWidth : 3 , alignItems : "center" , justifyContent : "center" }} >
         {
           props.active ? <View style={{ width : 18 , height : 18 , borderRadius : 100 , backgroundColor : colors.lightSlash }} ></View> : null
         }

       </View>
       <Text >
         {props.title}
       </Text>
     </TouchableOpacity>

     </View>
   </View>
  )
}


function CardNavigator(props){

  return (
    <TouchableOpacity onPress={props.onPress} >
    <View style={[{ width : 100 , height : 60 , backgroundColor : "#3c0842" , borderRadius : 4 , flexDirection : "row" , alignItems : "center" , justifyContent : "center" },props.style]} >
      <Text style={{ fontWeight : "400" , fontFamily : "Roboto" , color : "white" , marginRight : 5 }} >{props.title}</Text>
      <Icon name={props.icon} size={30} color="white" />
    </View>
    </TouchableOpacity>

  )
}


function CardInfomation(props){

  return (
    <View style={{ flexDirection : "row" }} >
      <View style={{ flex : 1 , alignItems : "center" , flexWrap : "wrap" , justifyContent : "space-between" , flexDirection : "row" }} >
        {
          props.cards.map((item,index) => (
            <View key={index}  style={[{ flexDirection : "column" , flexBasis : "50%" , justifyContent : "flex-start" , marginTop : 10 },item.style]} >
              <Text style={[{ fontSize : 14 , color : colors.lightGray , fontWeight : '400' },item.styleTitle]} >{item.title}</Text>
              <Text style={[{ fontSize : 18 , marginTop : 4 , fontWeight : '400' },item.styleDesc]} >{item.desc}</Text>
            </View>
          ))
        }
      </View>
    </View>
  )
}

class Transaction extends React.Component {

  anapScroll = null

  constructor(props){
    super(props)

    this.state = {
      activeReload : false,
      process : [
        { 
          icon : "room",
          active : false
        },
        { 
          icon : "attach-money",
          active : false
        },
        { 
          icon : "shopping-cart",
          active : false
        }
      ],
      adress : {
        activeBar : false,
        shippingType : undefined,
        country : "",
        state : "",
        city : "",
        neighborhood : "",
        street : "",
        street_number : "",
        zipcode : "",
        complement : "",
        federation_unity : "",
        amount : "",
        listService : [
          {
            active : false,
            title : "Sedex",
            value : "SEDEX VAREJO 2.0"
          },
          {
            active : false,
            title : "Pac",
            value : "PAC VAREJO 2.0"
          },
          {
            active : false,
            title : "Moto Boy",
            value : "motoboy"
          }
        ]
      },
      typePayment : {
        cardCredit : {
          card_id_checkout : "",
          card_number : "",
          card_expiration_date : "",
          card_cvv : "",
          card_holder_name : "",
          brand : url + "/cardcredit/media/images_icons/stp_card_mastercard.png"
        }
      },
      checkoutPayment : {
        typePayment : "credit_card",
        deadline : null,
        installments : 12,
        amountfreigth : 0,
        payInstallments : 1,
      }
    }

    this.animated = new Animated.Value(0)
    this.quantity = 3
    this.space = 80
    this.marginHorizontal = 10
    this.itemWidth = (width / this.quantity) - (this.quantity - 1) * this.space + this.marginHorizontal
    this.conponentScroll = null
  }

  componentDidMount(){
    console.log(this.props)
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }
  //active Function Process
  processNext = (name,stateindex) => {
    this.conponentScroll.getScrollResponder().scrollTo({ x : width * (stateindex + 1) , y :0 , animated: true })
  }

  onChangeAdress = (adress) => {
    this.setState({
      adress
    },() => {
      console.log(this.state.adress)
    })
  }

  activeReload = () => {
    this.setState(state => {
      return {
        activeReload : !state.activeReload 
      }
    })
  }

  activeBarAdress = () => {
    this.setState({
      adress : {
        ...this.state.adress,
        activeBar : !this.state.adress.activeBar
      }
    },() => {
      console.log("active ar")
    })
  }

  activeProcess = (name,active) => {
    const { process } = this.state

    let updateProcess = process.map(item => item.icon === name ? { ...item , active } : item )

    this.setState({
      process : updateProcess
    })
  }

  checkSelectService = (value) => {
    const { adress  } = this.state
    const { listService , city , country , state , neighborhood , street , street_number , zipcode , complement } = this.state.adress

    if(city.length > 0 && state.length > 0 && neighborhood.length > 0 && street.length > 0 && street_number.length > 0 && zipcode.length > 0 && complement.length > 0 ){
      let listServiceUpdate = listService.map((item) => item.value === value ? {...item , active : true } : { ...item , active : false } )
        this.setState((state) => {
          return {
            adress: {
              ...state.adress,
              shippingType : value,
              listService : listServiceUpdate
            }
          }
        },() => {
         if(listServiceUpdate.filter(service => service.active).length > 0){
             this.onRequestFreightCalculation()
           }
        })
    }else{
      Object.keys(adress).map(attrib => {
        if(typeof adress[attrib] == "string"){
          console.log(adress[attrib],"----->")
        }
      })
    }

  
  }

  navigatorTypeCheckout = (navigator) => {

    const { typePayment } = this.state.checkoutPayment

    if(navigator != typePayment){
      this.activeProcess("attach-money",false)
    }

    if(navigator == "boleto"){
      this.activeProcess("attach-money",true)
    }

    this.setState(state => {
      return {
        checkoutPayment : {
          ...state.checkoutPayment,
          typePayment : navigator
        }
      }
    })

    console.log(this.state)
  }

  onChangeCardCredit = (card) => {
    const { user } =  this.props
    const { cardCredit } = this.state.typePayment
    const { number , expiry , cvc , type } = card.values
    
    console.log(card)
    if(card.valid){

      let card_number = number.replace(/ /g,"")
      let card_expiration_date = expiry.replace(/\//g,"")

      this.onRequestRegisterCardCredit({ iduser : user.id , card_holder_name : cardCredit.card_holder_name , card_number , card_expiration_date , card_cvv : cvc   })
    }else{
      this.activeProcess("attach-money",false)
    }


    this.setState({
      typePayment : {
        cardCredit : {
          ...cardCredit,
          card_number : number,
          card_expiration_date : expiry,
          card_cvv : cvc,
        }
      }
    })
  }

  onChangeIntallments = (intallments,intemIndex) => {
    const { checkoutPayment } = this.state
    this.setState({
      checkoutPayment : {
        ...checkoutPayment,
        payInstallments : intallments
      }
    })
  }

  priceTotalCheckout = () => {
    const { amountfreigth } = this.state.checkoutPayment
    const { totalPrice , totalDescont } = this.props

    return (totalPrice() - totalDescont()) + amountfreigth 
  }

  //Requests
  onRequestAdress = () => {
    const { adress } = this.state
    if(this.state.adress.zipcode.length === 8){
      try {

        requestAdressSearch({ zipcode : this.state.adress.zipcode }).then(({response}) => {
          console.log(response)
          this.setState({
            adress : {
              ...adress,
              ...response
            }
          })
        })
        
      } catch (error) {
        console.log(error)        
      }
    }
  }

  onRequestFreightCalculation = () => {

    const { user } = this.props
    const { checkoutPayment } = this.state
    const { listService , street , street_number , city , complement , neighborhood , federation_unity , zipcode   } = this.state.adress

    this.activeBarAdress()
    this.activeReload()

    try {
      requestTransactionFreightCalculation({ 
        iduser : user.id,
        street,
        street_number,
        city,
        complement,
        neighborhood,
        federation_unity, 
        zipcode,
        codeservice : listService.filter((service) => service.active )[0].value }).then(({ response }) => {
          console.log("---- aqui")
          this.setState({
            checkoutPayment : {
              ...checkoutPayment,
              deadline : response.prazoEntrega,
              amountfreigth : response.valor
            }
          },() => {
            this.activeProcess("room",true)
            this.activeReload()
          })

        }).catch((error)=>{
          this.activeReload()
          console.warn("agora error")
        })
    } catch (error) {
      console.error(error)
      this.activeReload()
    }
  }

  onRequestRegisterCardCredit = ({ iduser , card_number , card_expiration_date , card_cvv , card_holder_name  }) => {

    const { cardCredit } = this.state.typePayment

    this.activeReload()

    try{
      requestRegisterCardCredit({ iduser , card_number , card_expiration_date , card_cvv , card_holder_name }).then(({ response }) => {
        console.log(response)
        this.setState({
          typePayment : {
            cardCredit : {
              ...cardCredit,
              ...response
            }
          }
        },() => {
          this.activeProcess("attach-money",true)
          this.activeReload()
        })
      }).catch((error)=>{
        this.activeReload()
      })
    }catch (error){
      this.activeReload()
      console.error(error)
    }
    
  }

  onRequestCheckout = () => {
    const { user } = this.props
    const { checkoutPayment , adress , typePayment } = this.state
    const { city , street , street_number , neighborhood , country , complement , state , federation_unity , zipcode , shippingType  } = adress
    const { cardCredit } = typePayment

    this.activeReload()

    console.warn("sim")

    try {

      requestCheckout({ 
        iduser : user.id,
        city, 
        street,
        street_number,
        neighborhood,
        country,
        complement,
        state,
        federation_unity,
        zipcode,
        id_card : cardCredit.card_id_checkout,
        installments : checkoutPayment.payInstallments ,
        delivery_date : "",
        shipping_date : "",
        shipping_type : shippingType,
        payment_method : checkoutPayment.typePayment,
        order : "Produto de application",
        phone : "15981135388",
      }).then(({ response }) => {
        if(!response.hasOwnProperty("errros")){
          this.props.navigation.dispatch(navigationAppAction)
          
          this.props.userClearProducts([])
          this.props.removeProductsAll()

          this.activeReload()
        }else{
          console.warn("sim 404")
        }

      }).catch((error) => {
        this.activeReload()
        console.warn(error)
      })
      
    } catch (error) {
      this.activeReload()
      console.warn(error)
    }

  }

  render() {
     
    const { activeReload , process , adress , typePayment , checkoutPayment  } = this.state
    const { totalPrice , totalDescont } = this.props

    return (
        <ContainerLayout
           style={{
               width : width,
               alignItems: "flex-start",
               justifyContent: "flex-start",
               flex: 1
           }}
        >
        <StatusBar/>
        <View style={{ flexDirection : "row" , justifyContent : "center"  , alignItems : "center" , width : width }} >
          {
            process.map((item,index) => {

              let animatedBack = this.animated.interpolate({
                inputRange : [ width * (index - 1), width * (index) ],
                outputRange : [ 'rgb(255,255,255)' ,  'rgb(84,243,2)' ],
                extrapolate : "clamp"
              })

              
              let animatedFlex = this.animated.interpolate({
                inputRange : [ width * (index - 1), width * (index) ],
                outputRange : [ 0 ,  1 ],
                extrapolate : "clamp"
              })

               return (
                 <View key={index} style={{ alignItems : "center" , flexDirection : "row"  }} >
                  {
                    index === 0 ? null :
                    <Animated.View style={{ width : ( this.space  ) , height : 3 , backgroundColor : "white" , marginHorizontal : this.marginHorizontal , alignItems : "center" , justifyContent : "flex-start" , flexDirection : "row"  }} >
                       <Animated.View style={{ flex : animatedFlex , height : 3 , backgroundColor : colors.lightGreen }} ></Animated.View>
                    </Animated.View>
                  }
                  <Animated.View style={{ height : 50 , width : 50 , borderRadius : 100 , borderColor : animatedBack , borderWidth : 2, alignItems : "center" , justifyContent : "center"  }} >
                      <Icon name={item.icon} size={25} color={"white"} />
                  </Animated.View>
               </View>
               )
            })
          }
        </View>

          <ScrollView 
            ref={scroll => this.conponentScroll = scroll}
            horizontal={true}
            pagingEnabled={true}
            scrollEnabled={false}
            scrollEventThrottle={10}
            showsHorizontalScrollIndicator={false}
            scrollIndicatorInsets={{top : 10,left : 10,bottom : 10,right : 10}}
            onScroll={
              Animated.event([
                {
                  nativeEvent : { contentOffset : { x : this.animated } }
                }
              ])
            }
          >

            {
              process.map((item,index) => {
                if (item.icon === "room"){
                  return (
                  <View key={index} style={{ justifyContent : "center" , alignItems : "center" , flexDirection : "column", flex : 1, width : width }} >

                  <View style={{ flex : 1 , alignItems : "center" , justifyContent : "center" }} >
      
                      <View style={styles.containerInput} >
                          <TSInput 
                              style={{ flex : 1 }} 
                              value={adress.zipcode} 
                              maxLength={8}
                              match={"[0-9]{8}"}
                              onChangeText={(zipcode) => { this.onChangeAdress({ ...adress , zipcode }) }} 
                              placeholder="Cep"
                              onBlur={() => { this.onRequestAdress() }} />
                          <TSInput 
                              style={{ flex : 1 }} 
                              value={adress.state}
                              match={"[A-z]+"}
                              placeholder="Estado" 
                              onChangeText={(state) => { this.onChangeAdress({ ...adress , state }) } } />
                      </View>
                      <View style={styles.containerInput} >
                        <TSInput 
                            style={{ flex : 1 }} 
                            value={adress.city}
                            match={"[A-z]+"} 
                            placeholder="Cidade" 
                            onChangeText={(city) => { this.onChangeAdress({ ...adress, city }) }} />
                      </View>
                      <View style={styles.containerInput} >
                        <TSInput 
                            style={{ flex : 1 }} 
                            match={"[A-z]+"}
                            value={adress.neighborhood} 
                            placeholder="Bairro" 
                            onChangeText={(neighborhood) => { this.onChangeAdress({...adress , neighborhood })}} />
                      </View>
                      <View style={styles.containerInput} >
                        <TSInput 
                            style={{ flex : 1 }} 
                            value={adress.street} 
                            match={"[A-z]+"}
                            placeholder="Endereço" 
                            onChangeText={(street) => { this.onChangeAdress({...adress , street })}} />
                         
                      </View>
                      <View style={styles.containerInput} >
                          <TSInput 
                                style={{ flex : 2 }}
                                value={adress.complement} 
                                match={"[A-z]+"}
                                placeholder="Complemento"
                                onChangeText={(complement) => { this.onChangeAdress({...adress , complement })}} />
                          <TSInput 
                                style={{ flex : 1 }}
                                value={adress.street_number}
                                match={"[0-9]"}
                                placeholder="Número" 
                                onChangeText={(street_number) => { this.onChangeAdress({...adress , street_number })}} />
                      </View>
      
                      <View style={styles.containerInput} >
      
                        <TouchableNativeFeedback onPress={() => { this.activeBarAdress() }} >
                           <View style={{ flex : 1 , flexDirection : "row" , justifyContent : "space-between" , alignItems : "center" , paddingVertical : 15 , paddingHorizontal : 10 }} >
                             <Text style={{ color : "white" }} >Selecionar Tipo de Entrega</Text>
                             <Icon name="add-circle" size={25} color="white" />
                           </View>
                        </TouchableNativeFeedback>
      
                      </View>
      
                  </View>
      
                  <View style={{ height : 120 , width : width , flexDirection : "row" , alignItems : "center" }} >
                      <View style={{ flex : 1, paddingLeft : 20, alignItems : "flex-start" , justifyContent : "flex-start" , flexDirection : "column"  }} >
                          <Text style={{ color : "white" , fontFamily: "Roboto", fontWeight : "500" , fontSize : 30 }} >{ numberToReal(checkoutPayment.amountfreigth,true) }</Text>
                          <Text style={{ color : "white" , fontFamily : "Roboto" , fontWeight : "400" , fontSize : 16 , marginBottom : 5  }} > { checkoutPayment.deadline === null ? null : `Prazo de entrega : ${checkoutPayment.deadline} dia` }</Text>

                      </View>
                      <ButtonNext onPress={() => { this.processNext(item.icon,index) }} active={item.active} />
                  </View>
      
                 </View>
                  ) 
              }

              if(item.icon === "attach-money"){
                return (
                  <View  key={index} style={{ justifyContent : "center" , alignItems : "center" , flex : 1 , width : width }} >

                  <View style={{ flexDirection : "row" , marginTop : 40 }} >
                     <View style={{ flex : 1 , flexDirection : "row" , justifyContent : "center" , alignItems : "center" }} >
                       <CardNavigator onPress={() => { this.navigatorTypeCheckout("credit_card") } } style={{ marginRight : 20 }} title="Cartão" icon="credit-card" ></CardNavigator>
                       <CardNavigator onPress={() => { this.navigatorTypeCheckout("boleto") } } title="Boleto" icon="credit-card" ></CardNavigator>
                     </View>
                  </View>
     
                <View style={{ flex : 1 , alignItems : "center" , justifyContent : "center" }} >
     
                  {
                    checkoutPayment.typePayment === "credit_card" ?
                    <View style={{ flexDirection : "row" }} >
                     <View style={{ flex : 1 , backgroundColor : "white" , marginHorizontal : 15 , borderRadius : 4 }} >
                        <View style={styles.containerInput} >
                          <TSInput
                            style={{ flex : 1, color : "black" }}
                            value={typePayment.cardCredit.card_holder_name}
                            match={"[A-z]+"}
                            placeholder="Nome"
                            onChangeText={(name) => { this.setState({ typePayment : {  cardCredit : { ...typePayment.cardCredit , card_holder_name : name }  } }) }}
                          />
                        </View>
                        <LiteCreditCardInput  style={{ flex : 1 }} onChange={(card) => { this.onChangeCardCredit(card) }} onValueChange={(v) => { alert("sim") }} />
                        
                        
                     </View>
                    </View> :
                    <View style={{ justifyContent : "center" , alignItems : "flex-start" , flex : 1 , marginVertical : 10 }} >
                         <ImageBackground source={require("../../assets/img/jpg/code.png")} style={{ width : 251 , flex : 1 , maxHeight : 551 ,  padding : 15 }} resizeMethod="resize" resizeMode="stretch" >

                           <CardInfomation  cards={[
                             { title : "Prazo" , desc : "3 DIAS" },
                             { title : "Pagamento" , desc : "Boleto" , style : { alignItems : "flex-end" } },
                             { title : "Descrição" , desc : "Quando ser afetua o pamento, avisaremos você para pode entregar o produto" , style : { marginTop : 90 , flexBasis : "100%" } , styleDesc : { fontSize : 14 }  }]} />

                         </ImageBackground>
                    </View>
                  }
                </View>
     
                <View style={{ height : 120 , width : width ,flexDirection : "row" , alignItems : "center" , justifyContent : "center" }} >
                     <View style={{ flex : 1, paddingLeft : 40, alignItems : "flex-start" , justifyContent : "center" , height : 120  }} >
                         {/* <Text style={{ color : "white" , fontFamily: "Roboto", fontWeight : "500" , fontSize : 30 }} ></Text> */}
                     </View>
                     <ButtonNext onPress={() => {  this.processNext(item.icon,index) }} active={item.active} />
                 </View>
                
                </View>
                )
              }

              if(item.icon === "shopping-cart"){
                return (
                    <View  key={index} style={{ justifyContent : "space-between" , alignItems : "center" , flex : 1 , width : width }} >
                       <View style={{ flexDirection : "row" , alignSelf : "flex-start" }} >
                       

                         <View style={{ flex : 1 , marginHorizontal : 15, marginVertical : 15 , backgroundColor : "white" , padding : 15 }} >
                           {
                             checkoutPayment.typePayment == "credit_card" ? (
                              <View style={{ flexDirection : "row" }} >
                              <View style={{ flex : 1 }} >
                                <Picker
                                  selectedValue={checkoutPayment.payInstallments}
                                  onValueChange={this.onChangeIntallments}
                                >
                                  {
                                    new Array(checkoutPayment.installments).fill(0).map((installments,index) => (
                                     <Picker.Item key={index} label={`Parcelar de ${index + 1} x ${ numberToReal(this.priceTotalCheckout() / (index + 1),true)} `} value={index + 1} ></Picker.Item>
                                    ))
                                  }
                                </Picker>
                              </View>
                            </View>
                             ) : null
                           }

                           <View style={{ flexDirection : "row" }} >
                             <View style={{ flex : 1 , alignItems : "center" , flexWrap : "wrap" , justifyContent : "space-between" , flexDirection : "row" , marginBottom : 30 }} >
                                
                                <View style={[{ flexDirection : "column" , flexBasis : "50%" , justifyContent : "flex-start" , marginTop : 10 }]} >
                                  <Text style={{ fontSize : 14 , color : colors.lightGray , fontWeight : '400' }} >Tipo de Pagamento</Text>
                                  <Text style={{ fontSize : 18 , marginTop : 4 , fontWeight : '400' }} >{ checkoutPayment.typePayment == "credit_card" ? "Cartão" : "Boleto" }</Text>
                                </View>
                                <View style={[{ flexDirection : "column" , flexBasis : "50%" , justifyContent : "flex-start" , alignItems : "flex-end" , marginTop : 10 }]} >
                                  {
                                    checkoutPayment.typePayment == "credit_card" ?
                                                      <View style={{ alignItems : "center" , justifyContent : "center" , flexDirection : "row-reverse" }} >
                                                          <Image source={{ uri :  typePayment.cardCredit.brand}} style={{ width : 66, height : 43 }} resizeMethod="resize" resizeMode="contain" />
                                                          <Text style={{ marginRight : 5 , color : "black", fontSize : 18 , fontWeight : "500" }} >{ typePayment.cardCredit.card_number.substr(12,16) }</Text>
                                                      </View> :
                                                      <View style={{ alignItems : "center" , justifyContent : "center" , flexDirection : "row" }} >
                                                           <Image style={{ width : 66 , height : 43 }}  source={{ uri : "http://10.0.2.2:8000/cardcredit/media/images_icons/boleot.png" }} resizeMode="cover"  />
                                                      </View>
                                  }
                                </View>
                              </View>
                           </View>

                           <CardInfomation  cards={[
                             { title : "Prazo de Entrega" , desc : `${checkoutPayment.deadline} Dia` , style : { flexBasis : "100%" } },
                             { title : "Total Produtos" , desc : numberToReal(totalPrice(),true) },
                             { title : "Desconto" , desc : numberToReal(totalDescont(),true) , style : { alignItems : "flex-end" } },
                             { title : "Total Frete" , desc : numberToReal(checkoutPayment.amountfreigth,true) },
                             { title : "Total", desc : numberToReal(this.priceTotalCheckout(),true) , style : { alignItems : "flex-end" }}]} />
                         </View>
                       </View>
                       <View style={{flexDirection : "row" }} >
                         <TouchableNativeFeedback onPress={this.onRequestCheckout} >
                            <View style={{ flex : 1 , marginHorizontal : 20 , marginBottom : 10 , alignItems : "center" , justifyContent : "center" ,backgroundColor : colors.lightGreen , height : 50 }} >
                              <Text style={{ color : "white" , fontWeight : "500" , fontSize : 18 }} >Fazer Pagamento</Text>
                            </View>
                         </TouchableNativeFeedback>
                       </View>
                    </View>
                )
              }
              })
            }

          </ScrollView>

          <TSCardElevation active={adress.activeBar} onPressActive={this.activeBarAdress} >
             <View >
               {
                 adress.listService.map((item,index) => (
                    <TSCheck key={index} onPress={ () => this.checkSelectService(item.value)} title={item.title} value={item.value} active={item.active} />
                 ))
               }
             </View>
          </TSCardElevation>

          <TSReloadApplication active={activeReload} />

          {/* <ScrollView
           ref={(anapScroll) => { this.anapScroll = anapScroll }}
           decelerationRate={0}
           onScroll={(event) ={

           }}
          /> */}
        </ContainerLayout>
    )
  }
}

export const stateMapProps = state => ({
  user : state.user,
  products : state.products,
  totalPrice : () => {
      return state.user.products.reduce((sum,i) => sum + (i.price * i.quantity) ,0)
  },
  totalDescont : () => {
      return state.user.products.reduce((sum,i) => sum + (i.price * i.descont) * i.quantity / 100 ,0)
  }
})

export const dispatchProps = dispatch => bindActionCreators({ userClearProducts , removeProductsAll },dispatch)

export default connect(stateMapProps,dispatchProps)(Transaction)

const styles = StyleSheet.create({
    container : {
        
    },
    containerInput : {
      flexDirection : "row" , marginHorizontal : 10 , 
    }
})