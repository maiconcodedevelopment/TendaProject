import {
    NavigationActions
} from "react-navigation";

export const navigationActionProdutcs = NavigationActions.navigate({
    routeName: "Produtcs",
    params: {},
    action: NavigationActions.navigate({
        routeName: "Produtcs"
    })
})