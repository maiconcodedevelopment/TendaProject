import {
    StyleSheet,
    Dimensions,
    DrawerLayoutAndroid
} from "react-native"

export const {
    width,
    height
} = Dimensions.get("screen");

export function wp(percentege) {
    return Math.round((percentege * width) / 100);
}

export const sliderHeight = 170;
export const sliderWidth = wp(100);
export const itemHorizontalMargin = wp(2);

export const itemProductHorizontal = (porcentege, margin) => {
    let widthscreen = Math.round(width * porcentege) / 100
    let widthrest = Math.round((margin * width) / 100)
    return {
        width: widthscreen,
        margin: widthrest
    }
}

export const itemWidth = sliderWidth + itemHorizontalMargin * 2;

export const colors = {
    slashStrong: "#ff0a44",
    lightSlash: "#ff0d46",
    lightGreen: "#65ff70",
    blackDark: "",
    lightPurple: "#1e0a1e",


}

export const statusBar = 30

export const styles = StyleSheet.create({
    innerContainer: {

    }
})

const font = {
    pattern: 12
}

export const stylesFont = StyleSheet.create({
    fontRoboto: {
        fontFamily: "Roboto"
    },
    fontSize: {
        fontSize: font.pattern
    }
})

export const styleIcon = StyleSheet.create({
    icon: {
        width: 10,
        height: 10,
    }
})