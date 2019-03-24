import {
    NavigationActions
} from "react-navigation"

export const navigationActionProduct = (product) => {
    return NavigationActions.navigate({
        routeName: "Product",
        params: product,
        action: NavigationActions.navigate({
            routeName: "Product"
        })
    })
}