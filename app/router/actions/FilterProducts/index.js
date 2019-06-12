import {
     NavigationActions  
    } from "react-navigation"

export const navigationActionFilterProducts = function({ params }){
    return NavigationActions.navigate({
        routeName : "FilterProducts",
        params : { ...params , animatetop : true },
        action : NavigationActions.navigate({
            routeName : "FilterProducts"
        })
    })
} 