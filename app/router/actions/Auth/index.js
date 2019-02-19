import {
    NavigationActions
} from "react-navigation"

export const navigationAuthAction = NavigationActions.navigate({
    routeName: "Auth",
    params: {},
    action: NavigationActions.navigate({
        routeName: "Auth"
    })
})