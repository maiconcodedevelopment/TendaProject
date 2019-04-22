import React from "react"
import { View , Text , ViewPagerAndroid , ProgressViewIOS , FlatList , StyleSheet } from "react-native";

import { connect } from "react-redux"
import { width } from "../../styles";
import { CardProduct } from "../../components/cardProduct";
import { requestAddProduct } from "../../redux/actions/Products/request";
import { navigationActionProduct } from "../../router/actions/Product";
import { userAddProduct , promotionsAddProduct } from "../../redux/actions/Products";
import { bindActionCreators } from "redux";
import ContainerLayout from "../../components/containerLayout";

class SearchProduct extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            refreging: false
        }
    }

    async componentDidMount(){

    }

    requestProducts() {
        setTimeout(() => {
          this.setState({
            refreging: false
          });
        }, 2000);
      }

    onRefreshProducts() {
        this.setState(
          {
            refreging: true
          },
          () => {
            this.requestProducts();
          }
        );
      }

    onScreenProduct(product) {
        const { navigation } = this.props;
        navigation.dispatch(navigationActionProduct(product));
    }

    activeLikeProduct(id) {
        requestAddProduct(1, id)
          .then(response => {
            this.props.userAddProduct(id);
          })
          .catch(error => {
            console.log(error);
          });
      }

    render(){
        const { refreging } = this.state
        const { searchProducts , products } = this.props
        return (
            <ContainerLayout
                style={{
                  width,
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flex: 1
                }} >

                <FlatList
                    contentContainerStyle={styles.containerProducts}
                    refreshing={refreging}
                    onRefresh={this.onRefreshProducts.bind(this)}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    data={searchProducts}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => (
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
                    )}/>
            </ContainerLayout>
        )
    }
}

let mapStateProps = state => ({
    searchProducts : state.products.searchProducts,
    products : state.products.products
})

let mapDispatchProps = dispatch => bindActionCreators({ userAddProduct },dispatch)

export default connect(mapStateProps,mapDispatchProps)(SearchProduct)

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    containerProducts: {
        width,
        alignItems: "center",
        justifyContent: "center",
        paddingTop : 20
      }
})