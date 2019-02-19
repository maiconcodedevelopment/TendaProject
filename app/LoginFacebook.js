import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class LoginFacebook extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.incrementCount()}>
          <View>
            <Text style={{ color: "#3b5998" }}>
              login facebook {this.props.count}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    incrementCount: () => dispatch({ type: "INCREASE_COUNT" }),
    decreaseCount: () => dispatch({ type: "DECREASE_COUNT" })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFacebook);

// <!-- Global site tag (gtag.js) - Google Analytics -->
// <
// script async src = "https://www.googletagmanager.com/gtag/js?id=UA-132036777-1" > < /script> <
//   script >
//   window.dataLayer = window.dataLayer || [];

// function gtag() {
//   dataLayer.push(arguments);
// }
// gtag('js', new Date());

// gtag('config', 'UA-132036777-1'); <
// /script>
