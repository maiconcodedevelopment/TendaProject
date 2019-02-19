import React from "react";
import { View, Text, Image, SectionList, StyleSheet } from "react-native";
import { CheckBox, SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ContainerLayout from "../../../../components/containerLayout";
import { width, stylesFont, colors } from "../../../../styles";
import { filterAddType } from "../../../../redux/actions/Products";

class FilterTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: true,
      search: ""
    };
  }

  capitalizeText(text) {
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    const { types, filterAddType } = this.props;

    return (
      <ContainerLayout
        style={{
          width,
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "flex-start"
        }}
      >
        <SectionList
          sections={types}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <CheckBox
                containerStyle={styles.cardType}
                textStyle={[
                  { color: "white", fontWeight: "400" },
                  stylesFont.fontRoboto,
                  stylesFont.fontSize
                ]}
                checkedIcon={
                  <Image
                    source={require("../../../../assets/icons/png/checkbox_active.png")}
                  />
                }
                uncheckedIcon={
                  <Image
                    source={require("../../../../assets/icons/png/checkbox_notactive.png")}
                  />
                }
                title={item.name}
                checked={item.active}
                onPress={() => filterAddType(item.id)}
              />
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={[styles.cardTitle, stylesFont.fontRoboto]}>
              {this.capitalizeText(section.title)}
            </Text>
          )}
          keyExtractor={(intem, index) => index}
        />
      </ContainerLayout>
    );
  }
}

const mapStateProps = state => ({
  products: state.products,
  types: state.products.types
});

const mapDispatchProps = dispatch =>
  bindActionCreators({ filterAddType }, dispatch);

export default connect(
  mapStateProps,
  mapDispatchProps
)(FilterTypes);

const styles = StyleSheet.create({
  cardType: {
    justifyContent: "space-between",
    marginLeft: 0,
    marginRight: 0,
    width,
    backgroundColor: "transparent",
    borderWidth: 0
  },
  cardTitle: {
    color: "white",
    fontSize: 16,
    paddingVertical: 10,
    paddingLeft: 15,
    backgroundColor: colors.lightPurple
  }
});
