import {
    NavigationActions
} from "react-navigation";

export const navigationActionFilterTypes = NavigationActions.navigate({
    routeName: "FilterTypes",
    params: {
        animateFilter: true
    },
    action: NavigationActions.navigate({
        routeName: "FilterTypes"
    })
})