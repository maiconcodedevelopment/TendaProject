import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Animated,
  Easing,
  TouchableNativeFeedback,
  StyleSheet
} from "react-native";
import ContainerLayout from "../../../../components/containerLayout";
import { colors, width, height } from "../../../../styles";

import { filterAddColor } from "../../../../redux/actions/Products";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CardColor from "./components/cardColor";

class FilterColors extends React.Component {
  render() {
    const { colors, filterAddColor } = this.props;

    return (
      <ContainerLayout
        style={{
          flex: 1,
          width,
          alignItems: "flex-start",
          justifyContent: "flex-start"
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false}
          numColumns={4}
          contentContainerStyle={{
            flex: 1
          }}
          keyExtractor={(item, index) => item.id}
          onScrollEndDrag={() => console.warn("frag")}
          data={colors}
          renderItem={({ item }) => (
            <CardColor
              id={item.id}
              onTouchColor={filterAddColor}
              active={item.active}
              color={item.color}
            />
          )}
        />
      </ContainerLayout>
    );
  }
}

const mapStateProps = state => ({
  colors: state.products.colors
});

const mapDispatchProps = dispatch =>
  bindActionCreators({ filterAddColor }, dispatch);

export default connect(
  mapStateProps,
  mapDispatchProps
)(FilterColors);
