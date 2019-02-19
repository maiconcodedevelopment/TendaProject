import {
     NavigationActions  
    } from "react-navigation"

export const navigationActionFilterProducts = NavigationActions.navigate({
    routeName : "FilterProducts",
    params : { animatetop : true },
    action : NavigationActions.navigate({
        routeName : "FilterProducts"
    })
})