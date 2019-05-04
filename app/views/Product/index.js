import React from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Touchable,
  Image,
  Easing
} from "react-native";

import { bindActionCreators } from "redux";
import { connect  } from "react-redux";

import { IconNode } from "react-native-elements";
import { width, colors , statusBar, itemWidth } from "../../styles";
import ContainerLayout from "../../components/containerLayout";

import { LinearGradient } from "expo"
import { requestProductrelated, requestAddProduct } from "../../redux/actions/Products/request";
import { navigationActionProduct } from "../../router/actions/Product";

import { userAddProduct } from "../../redux/actions/Products"
import { userAddAndRemoveProduct } from "../../redux/actions/Users";

import { CardProduct } from "../../components/cardProduct";
import { HeaderBack } from "../../components/headerBack";

HEIGHT_CARD_PRODUCTS = 300;
HEIGHT_CARD_PRODUCTS_MIN = 140;

SIZE_BUTTON_LIKE = 60;

const FIDEX_BAR_WIDTH = 180
const BAR_SPACE = 10

class Product extends React.Component {


  static navigationOptions = ({navigation}) => {
    return {
      header : <HeaderBack navigation={navigation} />
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      productsList : [
     
      ],
      id : this.props.navigation.state.params.id,
      scrollY: new Animated.Value(0),
      like : new Animated.Value(1)
    };

    this.typeProduct =  this.props.navigation.state.params.typeProduct

    this.numItems = this.props.navigation.state.params.images.length
    console.log(this.numItems)
    this.itemWidth = (FIDEX_BAR_WIDTH / this.numItems) - ((this.numItems -1) * BAR_SPACE)
    this.aniamVal = new Animated.Value(0)
  }

  async componentDidMount(){

    console.log(this.state.id)
    
    if(this.typeProduct === "product"){
      console.log(this.props.product(this.state.id))
    }else if(this.typeProduct == "promotion"){
      console.log(this.props.promotion(this.state.id))
    }

    console.log("iasdfjaisdj---fasdfd")
    await requestProductrelated(this.state.id,1).then((response) => {
      console.log("products list related")
      this.setState((state) => {
        return {
          productsList : response
        }
      })
    })
  }

  componentDidUpdate(){
    console.log("iasdjfopasjdfioajsd fjasdof jaosdjf poasdj foiasjd ofj--------")
  }

  componentWillUpdate(nextProps) {
    console.warn(nextProps);
  }

  screenLikeProduct = () => {

    Animated.sequence([
      Animated.timing(this.state.like, {
        toValue: 1.5,
        duration: 1000,
        easing: Easing.bounce
      }),
      Animated.timing(this.state.like, {
        toValue: 1,
        duration: 1000,
        easing: Easing.bounce
      })
    ]).start();
  }

  getProduct = () => {
    if(this.typeProduct === "product"){
      return this.props.product(this.state.id)[0]
    }else if(this.typeProduct === "promotion"){
      return this.props.promotion(this.state.id)[0].product
    }
  }

  activeLikeProduct(id,product){
    const { user } = this.props  

    requestAddProduct(user.id, id)
      .then(response => {
        this.props.userAddProduct(id);
        this.props.userAddAndRemoveProduct(product);
      })
      .catch(error => {
        console.log(error);
      });
  }


  onScreenProduct(product) {
    const { navigation } = this.props;
    navigation.dispatch(navigationActionProduct(product));
  }

  activeLike(active) {
    console.log("gostou kakakakak --- aqui")
    if (active) {
      return require("../../assets/icons/png/love_white.png");
    } else {
      return require("../../assets/icons/png/love_shash.png");
    }
  }

  priceFormat(price) {
    return new Intl.NumberFormat('pt-br',{ style : 'currency', currency : 'BRL' }).format(price)
  }

  render() {
    const { productsList } = this.state
    const { navigation , product } = this.props;
    const { like , images , tags , name , id , descont , price , category , subcategory , times } = this.getProduct()


    console.log(this.props.products)
    console.log("------------asdfasdfds")

    console.log(navigation.state.params)

    const heightProduct = {
      height: HEIGHT_CARD_PRODUCTS
    };

    const heightAnimtedScroll = this.state.scrollY.interpolate({
      inputRange: [0, HEIGHT_CARD_PRODUCTS - HEIGHT_CARD_PRODUCTS_MIN],
      outputRange: [HEIGHT_CARD_PRODUCTS, HEIGHT_CARD_PRODUCTS_MIN],
      extrapolate: "clamp"
    });

    const topAnimtedScroll = this.state.scrollY.interpolate({
      inputRange: [0, HEIGHT_CARD_PRODUCTS - HEIGHT_CARD_PRODUCTS_MIN],
      outputRange: [
        HEIGHT_CARD_PRODUCTS - (SIZE_BUTTON_LIKE + 15),
        HEIGHT_CARD_PRODUCTS_MIN - SIZE_BUTTON_LIKE / 2
      ],
      extrapolate: "clamp"
    });

    const topSlider = this.state.scrollY.interpolate({
      inputRange : [0,HEIGHT_CARD_PRODUCTS - HEIGHT_CARD_PRODUCTS_MIN],
      outputRange : [
        HEIGHT_CARD_PRODUCTS - (50),
        HEIGHT_CARD_PRODUCTS_MIN - (50)
      ],
      extrapolate : "clamp"
    })

    const rightAnimtedScroll = this.state.scrollY.interpolate({
      inputRange: [0, HEIGHT_CARD_PRODUCTS - HEIGHT_CARD_PRODUCTS_MIN],
      outputRange: [width / 2 - SIZE_BUTTON_LIKE / 2, 20],
      extrapolate: "clamp"
    });

    let barArray = []

    let ChipTagProduct = props => (
      <View style={[props.style,{ paddingHorizontal : 25 , paddingVertical : 10 , overflow : "hidden" , justifyContent : "center" , alignItems : "center" , borderColor : "white" , borderWidth : 1 }]} >
         <Text style={{ color : "white" }} >{ props.name }</Text>
      </View>
    )

    new Array(this.numItems).fill(0).forEach((element,i) => {

      const scrollBarval = this.aniamVal.interpolate({
        inputRange : [width * (i -1),width * (i + 1)],
        outputRange : [-this.itemWidth,this.itemWidth],
        extrapolate : "clamp"
      })

      // const scrollOpacity = this.aniamVal.interpolate({
      //   inputRange : [width * (i - 1),width * (i + 1)],
      //   outputRange : [1.2,1],
      //   extrapolate : "clamp"
      // })

      const thisBar = (
        <Animated.View key={`bar${i}`} style={[{ borderWidth : 2 , borderColor : "#2f2f2f" , height : 5 , overflow : "hidden", borderRadius : 50 } ,{ width : 10 , height : 10 , marginLeft : i === 0 ? 0 : BAR_SPACE } ]} >
         <Animated.View style={[ { backgroundColor : "white" , height : 5 , position : "absolute" , left : 0 , top : 0 , borderRadius : 50 } ,{ width : 10 , height : 10 , transform : [ { translateX : scrollBarval } ]} ]} ></Animated.View>
        </Animated.View>
      )

      barArray.push(thisBar)

    })

    return (
      <ContainerLayout style={{ flex: 1 , width : width , alignItems : "center" }}>

        <Animated.View
            style={[{
              width: SIZE_BUTTON_LIKE,
              height: SIZE_BUTTON_LIKE,
              backgroundColor: like ?  colors.lightSlash : "transparent" ,
              position: "absolute",
              top: topAnimtedScroll,
              right: rightAnimtedScroll,
              borderColor : colors.lightSlash,
              borderWidth : like ? 0 : 2,
              zIndex: 2,
              borderRadius: SIZE_BUTTON_LIKE / 2,
              marginLeft: 10,
              alignItems : "center",
              justifyContent : "center",
            },{ transform : [ { scale : this.state.like } ] }] }
          >
          {/* <TouchableNativeFeedback onPress={this.screenLikeProduct()} > */}
          <TouchableOpacity onPress={() => { this.screenLikeProduct(); this.activeLikeProduct(id) }} >
             <Image style={{ width : 40 , height : 40 }} source={this.activeLike(like)} />
          </TouchableOpacity>
           
           {/* </TouchableNativeFeedback> */}
        </Animated.View>

        

        <View style={{ height : statusBar }} >
         
        </View>

        <Animated.View style={{ position : "absolute" , left : 30 , top : topSlider , flexDirection : "row" , zIndex : 2 , paddingVertical : 25 }} >
            { barArray }
        </Animated.View>

        <Animated.ScrollView
          style={[
            {
              height: heightAnimtedScroll,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1
            }
          ]}
          onScroll={
            Animated.event(
              [
                  {
                      nativeEvent : { contentOffset : { x : this.aniamVal } }
                  }
              ]
            )
          }
          //   onScrollBeginDrag={() => console.warn("sim")}
          contentOffset={c => console.warn(c)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        >
          {images.map((image, index) => (

            <Animated.View
              key={index}
              style={[{ width, flex: 1, backgroundColor: "white" , position : "relative" }]}
            >
              
              <ImageBackground
                source={{ uri: image }}
                resizeMode="contain"
                style={{ flex: 1 }}
              >
                 <LinearGradient start={{ x : 0 , y : 0.65 }} style={{ position : "absolute" , bottom : 0 , left : 0 , height : HEIGHT_CARD_PRODUCTS , width : width , zIndex : 8 }} colors={["transparent","rgba(179,173,179,0.5)"]} ></LinearGradient>
              </ImageBackground>
            </Animated.View>
          ))}
         
        </Animated.ScrollView>

        {/* <Animated.View style={{ width : width , height : heightAnimtedScroll }} ></Animated.View> */}

        <Animated.ScrollView
          style={{
            paddingTop: heightAnimtedScroll,
            flex: 1
          }}
          // contentContainerStyle={{  }}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
        >
          <View style={{paddingLeft : 30}} >  
              <Text style={styles.title} >
                 {name}
              </Text>
    
              <View style={{ marginBottom : 45 }} >
                <Text style={styles.price} >
                    { this.priceFormat(price) }
                </Text>
                <Text style={styles.times} >{times} x sem juros</Text>
              </View>
    
              <View style={{ marginBottom : 30 }} >
                <TouchableOpacity>
                  <Text style={{ fontSize : 12 , fontWeight : "500" , color : "white" , paddingBottom : 3 }} >Sobre Produto</Text>
                  <View style={{ borderBottomColor : colors.lightSlash , borderBottomWidth : 2 , width : 70  }} >
                  </View>
                </TouchableOpacity>
              </View>
          </View>
         
          <View style={{ marginBottom : 30 }} >
            <FlatList
              keyExtractor={(item,index) => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft : 30 }}
              data={tags}
              renderItem={({item}) => (
                <ChipTagProduct style={{ marginRight : 10 }} name={item} />
              )}
            />
          </View>

          <View style={{ paddingLeft : 30 , marginBottom : 15 }}>
             <Text style={{ fontSize  : 18 , color : "white" , fontWeight : "500" }} >Produtos Relacionados</Text>
          </View>

          <View style={{ marginBottom : 200 }} >

          <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft : 25 }} horizontal={true}  >
             {
               productsList.map((item) => {
                console.log(item) 
                return (
                  <View key={item.id} >
                  <CardProduct
                      like={item.like}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      descont={item.descont}
                      image={item.images}
                      product={item}
                      onScreen={this.onScreenProduct.bind(this)}
                      activeLikeProduct={this.activeLikeProduct.bind(this)}
                  />
               
                 </View>
                 )  
             })
             }
          </ScrollView>
          </View>


        </Animated.ScrollView>
      </ContainerLayout>
    );
  }
}

const mapStateProps = state => ({
  user : state.user,
  products : state.products.products,
  product : function (id) {
    return  state.products.products.filter(product => product.id === id)
  },
  promotion : function(id) {
    return state.products.promotionsProduct.filter(promotion => promotion.product.id === id)
  }
});

const mapDispatchProps = dispatch => bindActionCreators({ userAddProduct , userAddAndRemoveProduct },dispatch)

export default connect(mapStateProps,mapDispatchProps)(Product);

const styles = StyleSheet.create({
  cardProductView: {
    flex: 1,
    width
  },
  likeLove: {},
  title : {
    fontSize : 25 , fontWeight : "bold" , width : 250 , color : "#fb4570" , marginBottom : 30
  },
  price : {
    fontSize : 30 , fontWeight : "bold" , color : "white" 
  },
  times : {
    fontSize : 14 , fontWeight : "500" , color : "white" 
  }
});
