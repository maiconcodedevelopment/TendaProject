import React from "react";
import {
  View,
  Text,
  Image,
  TouchableNativeFeedbackComponent,
  TouchableNativeFeedback,
  StyleSheet
} from "react-native";

import { colorsChip } from "./styles";

export default class ChipTag extends React.Component {
  render() {
    const { name, color, id, onTouch } = this.props;

    return (
      <View style={styles.chipTag}>
        {color ? (
          <View style={[styles.chipColor, { backgroundColor: color }]} />
        ) : (
          <Text
            style={{
              color: "white",
              paddingHorizontal: 20,
              fontSize: 12,
              fontWeight: "400",
              fontFamily: "Roboto"
            }}
          >
            {name}
          </Text>
        )}
        <TouchableNativeFeedback onPress={() => onTouch(id)}>
          <View style={styles.iconClose}>
            <Image
              style={{ width: 6, height: 6 }}
              source={require("../../../../assets/icons/png/close_white_small.png")}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chipTag: {
    marginRight: 15,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
    borderRadius: 2,
    backgroundColor: colorsChip.lightPurpleDark
  },
  iconClose: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#543954"
  },
  chipColor: {
    width: 50,
    height: 20,
    marginHorizontal: 6,
    borderRadius: 2
  }
});
