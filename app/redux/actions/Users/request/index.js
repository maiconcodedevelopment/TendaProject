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

export function requestAdressSearch({ zipcode }){

    return fetch(`${request.adress.search}/${zipcode}`,{
        method : "GET"
    }).then((response) => {
        if (response.status === 200){ return response.json() } throw new 'Exception' 
    }).then(response => {
        return { response : response }
    })
}


export function requestTransactionFreightCalculation({ iduser , street , street_number , city , complement , neighborhood , federation_unity , zipcode , codeservice }){

    let calculationfee = new FormData()
    calculationfee.append("iduser",iduser)
    calculationfee.append("street",street)
    calculationfee.append("street_number",street_number)
    calculationfee.append("city",city)
    calculationfee.append("complement",complement)
    calculationfee.append("neighborhood",neighborhood)
    calculationfee.append("federation_unity",federation_unity)
    calculationfee.append("zipcode",zipcode)
    calculationfee.append("codeservice",codeservice)

    return fetch(`${request.checkout.calculationfee}`,{
        method : "POST",
        body : calculationfee
    }).then(response => {
        console.log(response)
        if(response.ok && response.status === 200){
            return response.json()
        }
        throw new "Exception"
    }).then((response) => {
        return { response : response }
    })
}

export function requestRegisterCardCredit({ iduser , card_number , card_cvv , card_holder_name , card_expiration_date }){

    let cardcredit = new FormData()
    cardcredit.append("card_number",card_number)
    cardcredit.append("card_cvv",card_cvv)
    cardcredit.append("card_holder_name",card_holder_name)
    cardcredit.append("card_expiration_date",card_expiration_date)

    return fetch(`${request.cardcredit.register}${iduser}`,{
        method : "POST",
        body : cardcredit
    }).then(response =>{
        if(response.ok && response.status === 200){
            return response.json()
        }
        if(response.status === 204){
            return response.json()
        }
        throw new "Exception"
    }).then(response => {
        return { response : response }
    })
}