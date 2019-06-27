import { NavigationActions } from "react-navigation"

export const navigationActionTransactionList = NavigationActions.navigate({
    routeName : "TransactionList",
    action : NavigationActions.navigate({
        routeName : "TransactionList"
    })
})