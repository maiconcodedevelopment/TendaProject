import { NavigationActions } from "react-navigation"

export const navigationActionSearchProducts = (search) => {
    return NavigationActions.navigate({
        routeName : "SearchProducts",
        params : search,
        action : NavigationActions.navigate({
            routeName : "SearchProducts"
        })
    })
} 