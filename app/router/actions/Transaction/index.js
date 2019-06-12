import { NavigationActions } from "react-navigation"

export const navigationActionTransaction = NavigationActions.navigate({
    routeName : "Transaction",
    params : {},
    action : NavigationActions.navigate({
        routeName : "Transaction"
    })
})
