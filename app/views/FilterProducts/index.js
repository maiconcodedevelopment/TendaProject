import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Slider,
  Touchable,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { width, height, colors, styleIcon, stylesFont } from "../../styles";

import ContainerLayout from "../../components/containerLayout";
import CardSelectCategory from "./components/cardSelectCategory";
import ChipTag from "./components/chipTag";

import {
  filterAddProducts,
  filterUpdatePrice,
  filterAddCategory,
  filterAddTypes,
  filterAddType,
  filterAddColors,
  filterAddColor
} from "../../redux/actions/Products";
import { URLModel } from "../../redux/model/URLModel";
import { request } from "../../config/requestConfig";
import {
  requestFilterCategoryWidthSubCategory,
  requestFilterCategoryWitdhColors,
  requestProductsFilter
} from "../../redux/actions/Products/request";
import { navigationActionFilterTypes } from "../../router/actions/FilterTypes";
import { navigationActionFilterColors } from "../../router/actions/FilterColors";

class FilterProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
      priceStart: 0,
      priceEnd: 100,
      chipTags: [
        {
          name: "Mastubadores"
        },
        {
          name: "Mastubadores"
        },
        {
          name: "Mastubadores"
        },
        {
          name: "Mastubadores"
        },
        {
          name: "Mastubadores"
        },
        {
          name: "Mastubadores"
        },
        {
          name: "Mastubadores"
        }
      ]
    };
  }

  onTouchSelectCategory(id) {

    let promisefilter = new Promise((resolve, reject) => {
      resolve(this.props.filterAddCategory(id));
    }).catch(error => {
      console.log(error);
    });

    let category = new URLModel(request.category.subcategory, "GET");
    let categorycolors = new URLModel(request.colors.category, "GET");

    promisefilter
      .then(promise => {
        console.log(promise);
        this.props.categorys.forEach(element => {
          if (element.active) {
            category.append("idcategory", element.id);
            categorycolors.append("idcategory", element.id);
          }
        });
        category.concatURL();
        categorycolors.concatURL();
      })
      .then(promise => {
        requestFilterCategoryWidthSubCategory(category.getURL()).then(
          response => {
            this.props.filterAddTypes(response);
          }
        );
        requestFilterCategoryWitdhColors(categorycolors.getURL()).then(
          response => {
            this.props.filterAddColors(response);
          }
        );
      });
  }

  onAddTypes() {
    const { navigation } = this.props;
    navigation.dispatch(navigationActionFilterTypes);
  }

  onAddColors() {
    const { navigation } = this.props;
    navigation.dispatch(navigationActionFilterColors);
  }

  colorsExist(colors) {
    if (colors.length > 0) {
      return colors.map((item, index) => (
        <ChipTag key={index} color={item.color} />
      ));
    } else {
      return null;
    }
  }

  onChangeValuesSlider(values) {
    this.setState({ priceStart: values[0], priceEnd: values[1] });
  }

  filterProducts() {
    const { navigation, categorys, types, price } = this.props;
    navigation.goBack()
    navigation.state.params.resetProducts({ categorys , types , price })
  }

  render() {
    const {
      categorys,
      price,
      types,
      colors,
      filterUpdatePrice,
      filterAddType,
      filterAddColor
    } = this.props;

    let enableScroll = () => this.setState({ scrollEnabled: true });
    let disableScroll = () => this.setState({ scrollEnabled: false });

    let CustomSliderMarkerLeft = () => <View style={styles.sliderMarker} />;
    let CustomSliderMarkerRight = () => <View style={styles.sliderMarker} />;
    let CustomSliderLine = () => (
      <View style={{ width: 300, height: 15, backgroundColor: "blue" }} />
    );

    return (
      <ContainerLayout
        style={{
          width,
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "flex-start"
        }}
      >
        <ScrollView>
          <View style={{ paddingTop: 100 }}>
            <View style={styles.lineContent} />
            <FlatList
              horizontal={true}
              contentContainerStyle={{ flexGrow: 1, paddingLeft: 25 }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={categorys}
              renderItem={({ item }) => (
                <CardSelectCategory
                  icon={item.icon}
                  icondark={item.icondark}
                  isActive={item.active}
                  id={item.id}
                  name={item.name}
                  onTouchSelectCategory={this.onTouchSelectCategory.bind(this)}
                />
              )}
            />

            <View style={{ paddingLeft, marginVertical: 15, height: 100 }}>
              <View style={styles.priceShowSlider}>
                <Text style={styles.priceSlider}>R$ {price.start}</Text>
                <Text style={styles.priceSlider}>R$ {price.end}</Text>
              </View>

              <MultiSlider
                isMarkersSeparated={true}
                step={1}
                values={[price.start, price.end]}
                max={1000}
                min={10}
                onValuesChangeFinish={values => {
                  filterUpdatePrice({ start: values[0], end: values[1] });
                }}
                selectedStyle={{ backgroundColor: "rgba(57,45,57,1)" }}
                unselectedStyle={{
                  backgroundColor: "rgba(57,45,57,0.70)"
                }}
                touchDimensions={{ width: 25, height: 25 }}
                containerStyle={{ width: 200 }}
                trackStyle={{ borderRadius: 10 }}
                customMarkerLeft={e => (
                  <CustomSliderMarkerLeft currentValue={e.currentValue} />
                )}
                customMarkerRight={e => (
                  <CustomSliderMarkerRight currentValue={e.currentValue} />
                )}
              />
            </View>

            <View style={{ paddingLeft }}>
            <Text style={{ fontSize : 16 , color : "white" , fontWeight : '500' , fontFamily: "Roboto" }} >Sub-Categorias</Text>
              <View
                style={{
                  marginVertical: 10,
                  position: "relative",
                  alignItems: "center"
                }}
              >
                <TouchableNativeFeedback onPress={this.onAddTypes.bind(this)}>
                  <View style={styles.buttonAddTag}>
                    <Image
                      style={{ width: 10, height: 10 }}
                      source={require("../../assets/icons/png/add__white.png")}
                    />
                  </View>
                </TouchableNativeFeedback>

                <FlatList
                  contentContainerStyle={{
                    zIndex: 1,
                    paddingLeft: 55,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "flex-start"
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={types}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <ChipTag
                      onTouch={filterAddType}
                      id={item.id}
                      name={item.name}
                    />
                  )}
                />
              </View>

              <Text style={{ fontSize : 16 , color : "white" , fontWeight : '500' , fontFamily: "Roboto" }} >Cores</Text>

              <View
                style={{
                  marginVertical: 10,
                  position: "relative",
                  alignItems: "center"
                }}
              >
                
                <TouchableNativeFeedback onPress={this.onAddColors.bind(this)}>
                  <View style={styles.buttonAddTag}>
                    <Image
                      style={{ width: 10, height: 10 }}
                      source={require("../../assets/icons/png/add__white.png")}
                    />
                  </View>
                </TouchableNativeFeedback>

                <FlatList
                  contentContainerStyle={{
                    zIndex: 1,
                    paddingLeft: 55,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "flex-start"
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={colors}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <ChipTag
                      onTouch={filterAddColor}
                      id={item.id}
                      color={item.color}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            width,
            position: "absolute",
            left: 0,
            bottom: 0,
            justifyContent: "flex-end",
            alignItems: "flex-end"
          }}
        >
          <TouchableNativeFeedback onPress={this.filterProducts.bind(this)}>
            <View style={styles.buttonFilter}>
              <Text
                style={[
                  { color: "white" },
                  stylesFont.fontRoboto,
                  stylesFont.fontSize
                ]}
              >
                Filtrar
              </Text>
              <Image
                style={[{ marginLeft: 10 }, styleIcon.icon]}
                source={require("../../assets/icons/png/flesh_white.png")}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </ContainerLayout>
    );
  }
}

const mapStateProps = state => ({
  products: state.products,
  categorys: state.products.categorys,
  price: state.products.filter.price,
  colors: state.products.filter.colors,
  types: state.products.filter.types
});

const mapDispatchProps = dispatch =>
  bindActionCreators(
    {
      filterAddProducts,
      filterUpdatePrice,
      filterAddCategory,
      filterAddTypes,
      filterAddType,
      filterAddColors,
      filterAddColor
    },
    dispatch
  );

export default connect(
  mapStateProps,
  mapDispatchProps
)(FilterProducts);

const paddingLeft = 25;

const styles = StyleSheet.create({
  lineContent: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.3)",
    paddingLeft,
    marginHorizontal: 25,
    marginBottom: 25
  },
  sliderMarker: {
    width: 25,
    height: 25,
    backgroundColor: "white",
    borderRadius: 50,
    position: "relative"
  },
  priceShowSlider: {
    width: width * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  },
  priceSlider: {
    color: "white",
    fontSize: 18,
    fontWeight: "500"
  },
  buttonAddTag: {
    width: 50,
    height: 50,
    zIndex: 2,
    backgroundColor: colors.lightGreen,
    position: "absolute",
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2
  },
  contentFilter: {
    width,
    height: 100,
    position: "absolute",
    bottom: 0,
    left: 0
  },
  buttonFilter: {
    width: 100,
    height: 40,
    margin: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "white",
    zIndex: 3
  }
});
