import {
    request
} from "../../../../config/requestConfig";


export function requestProducts() {
    return fetch(request.product.all, {
        method: "GET"
    }).then(response => response.json());
}

export function requestPromotionsProduct(){
    return fetch(request.product.promotions.all).then((response)=>{
        return response.json()
    })
}

export function requestPromotionMain(){
    return fetch(request.promotion.all).then((response) => {
        return response.json()
    })
}

export function requestProductrelated(id,iduser){
    console.log(`${request.product.related}${id}/${iduser}`)
    return fetch(`${request.product.related}${id}/${iduser}`,{ method : "GET" }).then((response) => {
        console.log(response)
        return response.json()
    })
}

export function requestProductsFilter(url) {
    return fetch(url, {
        method: "GET"
    }).then(response => response.json())
}

export function requestCategoryProducts(url) {
    return fetch(url, {
        method: "GET"
    }).then(response => response.json());
}

export function requestAddProduct(iduser, idproduct) {
    let data = new FormData();
    data.append("iduser", iduser);
    data.append("idproduct", idproduct);

    return fetch(request.users.productadd, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        body: data
    });
}

export function requestProductSearch(url) {
    return fetch(url, {
        method: "GET"
    }).then(response => response.json())
}

//filter products

export function requestFilterCategoryWidthSubCategory(url) {
    return fetch(url, {
        method: "GET",
    }).then(response => response.json())
}

export function requestFilterCategoryWitdhColors(url) {
    return fetch(url, {
        method: "GET"
    }).then(response => response.json())
}
