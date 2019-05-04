import { NavigationActions } from "react-navigation";

export const navigationActionCartProducts = NavigationActions.navigate({
    routeName : "CardProducts",
    params : {},
    action : NavigationActions.navigate({
        routeName : "CardProducts"
    })
})