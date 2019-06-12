import {
    NavigationActions
} from "react-navigation";

export const navigationActionProdutcs = ({ params }) => {
   return NavigationActions.navigate({
    routeName: "Produtcs",
    params,
    action: NavigationActions.navigate({
        routeName: "Produtcs"
    })
})
} 