import {
    request
} from "../../config/requestConfig";
import {
    URLModel
} from "./URLModel"

export class ProductsModel {


    constructor(url, method) {
        this.url = new URLModel(url, method)
    }

    pushCategorys(categorys) {
        let query = Object.keys(categorys).map(category =>
            categorys[category].map(value =>
                encodeURIComponent(category) + "=" + encodeURIComponent(value)
            ).join("&")
        )[0]
        this.url += query
    }

    pushUser(iduser) {
        this.url += "iduser=" + iduser + "&"
    }

    getUrl() {
        return this.url
    }


    startRequest() {
        return fetch(url, {
            method: "GET"
        }).then(response => response.json())
    }

}