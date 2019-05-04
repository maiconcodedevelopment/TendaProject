import {
    request
} from "../../../../config/requestConfig";
import { URLModel } from "../../../model/URLModel";

export function requestUserGet({ iduser }){
    return fetch(`${request.users.get}${iduser}`, { method : "GET" }).then(response => {
        if(response.ok && response.status === 200){
            return response.json()
        }
        throw new "Error"
    }).then(response => { 
        return { response : response } 
    })
}

export function requestLoginIn({ email , password }){
    let model = new URLModel(request.users.login,"GET")
    model.append("email",email)
    model.append("password",password)
    model.concatURL()

    console.log(model.getURL())

    return fetch(model.getURL(),{
        method : "GET"
    }).then((response) => {
        if(response.status === 200){
            return response.json()
        }
        throw new "Error Request"
    }).then((response) => {
        return { response : response }
    })
}

export function requestRegister({ username , email , password }){
    
    let model = new FormData()
    model.append("username",username)
    model.append("email",email)
    model.append("password",password)

    return fetch(request.users.login, {
        method : "POST",
        body : model
    }).then((response) => {
        if(response.ok && response.status == 200){
            return response.json()
        }
        throw new "Error Request"
    }).then((response) => {
        return { response : response }
    })
}

export function requestCartProducts({ iduser }){

    return fetch(`${request.users.cart.products}${iduser}`,{ method : "GET" }).then((response) => {
        if(response.ok && response.status === 200){
            return response.json()
        }
        throw new "Exception"
    }).then((response) => {
        return { response : response }
    })

}

export function requestCartIncrement({ iduser, idproduct,  increment }){

    return fetch(`${request.users.cart.incremnet}${iduser}/${idproduct}/${increment}`, { 
        method : "GET" 
    }).then((response) => {
        if(response.ok && response.status === 200){
            return response.json()
        }
        throw new "Exception"
    }).then((response) => {
        return { response : response }
    })
    
}