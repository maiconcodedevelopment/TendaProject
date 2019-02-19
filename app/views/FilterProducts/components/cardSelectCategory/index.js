import React from "react";
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  StyleSheet
} from "react-native";
import { colors, stylesFont } from "../../../../styles";
import { colorsCardSelectCategory } from "./styles";

export default class CardSelectCategory extends React.Component {
  render() {
    const {
      icon,
      icondark,
      name,
      id,
      isActive,
      onTouchSelectCategory
    } = this.props;

    const activeCategory = {
      backgroundColor: isActive
        ? colorsCardSelectCategory.lightGreen
        : colorsCardSelectCategory.lightPurple
    };

    const color = isActive ? colorsCardSelectCategory.lightDark : "white";

    const iconChange = isActive ? icondark : icon;

    return (
      <TouchableNativeFeedback onPress={() => onTouchSelectCategory(id)}>
        <View style={[styles.cardSelectCategory, activeCategory]}>
          <Image
            style={{ width: 35, height: 35, marginBottom: 5 }}
            source={iconChange}
          />
          <Text
            style={[
              { color, fontSize: 10, fontWeight: "500" },
              stylesFont.fontRoboto
            ]}
          >
            {name}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  cardSelectCategory: {
    width: 80,
    height: 100,
    marginRight: 20,
    borderRadius: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});
