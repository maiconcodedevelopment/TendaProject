import {
    NavigationActions
} from "react-navigation";

export const navigationActionFilterColors = NavigationActions.navigate({
    routeName: "FilterColors",
    params: {
        animateFilter: true
    },
    action: NavigationActions.navigate({
        routeName: "FilterColors"
    })
})