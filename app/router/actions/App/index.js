import {
    NavigationActions
} from "react-navigation"

export const navigationAppAction = NavigationActions.navigate({
    routeName: "App",
    params: {},
    action: NavigationActions.navigate({
        routeName: "App"
    })
})