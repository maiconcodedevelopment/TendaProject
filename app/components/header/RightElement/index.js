import React from "react";

//import liraries
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

// create a component
export default class RightElement extends React.Component {
  render() {
    const {
      isSearchActive,
      searchValue,
      onPressPressed,
      onSearchClear
    } = this.props;

    if (isSearchActive && searchValue.length === 0) {
      return null;
    }

    const iconProps = {};

    if (isSearchActive && searchValue.length > 0) {
      iconProps.name = "clear";
      iconProps.color = "black";
      iconProps.onPress = onSearchClear;
    } else {
      iconProps.name = "search";
      iconProps.color = "white";
      iconProps.onPress = onPressPressed;
    }

    return (
      <View style={styles.container}>
        <Icon {...iconProps} />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5
  }
});
