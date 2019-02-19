import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback
} from "react-native";
import { Svg } from "expo";

export default class CardSelectCategory extends React.Component {
  render() {
    const { icon, id, onTouchSelectCategory } = this.props;
    return (
      <TouchableNativeFeedback onPress={() => onTouchSelectCategory(id)}>
        <View style={styles.cardSelectCategory}>
          <Image
            style={{ width: 30, height: 30, marginBottom: 5 }}
            source={icon}
          />
          <Text style={styles.categoryname}>{this.props.name}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  cardSelectCategory: {
    marginRight: 15,
    height: 100,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  categoryname: {
    color: "white",
    fontSize: 13
  }
});
