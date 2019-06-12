import { NavigationActions } from "react-navigation"

export const navigationActionTransaction = NavigationActions.navigate({
    routeName : "AdressTransaction",
    params : {},
    action : NavigationActions.navigate({
        routeName : "AdressTransaction"
    })
})
