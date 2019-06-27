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

export function requestRegister({ username , email , password , cpf }){
    
    let model = new FormData()
    model.append("username",username)
    model.append("email",email)
    model.append("password",password)
    model.append("cpf",cpf)

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

export  function requestCheckout ({ iduser , city , street , street_number , neighborhood , country , complement , state , federation_unity , zipcode , id_card , installments , delivery_date , shipping_date , shipping_type , payment_method , order , phone }){
    
    let checkout = new FormData()
    checkout.append("city",city)
    checkout.append("street",street)
    checkout.append("street_number",street_number)
    checkout.append("neighborhood",neighborhood)
    checkout.append("country",country)
    checkout.append("complement",complement)
    checkout.append("state",state)
    checkout.append("federation_unity",federation_unity)
    checkout.append("zipcode",zipcode)
    checkout.append("id_card",id_card)
    checkout.append("installments",installments)
    checkout.append("delivery_date",delivery_date)
    checkout.append("shipping_type",shipping_type)
    checkout.append("payment_method",payment_method)
    checkout.append("order",order) //micropost
    checkout.append("phone",phone)

    return fetch(`${request.checkout.products}${iduser}`,{
        method : "POST",
        body : checkout
    }).then((response)=>{
        if(response.status === 200){
            return response.json()
        }
        if(response.status === 400){
            return response.json()
        }
        throw new "Exception"
    }).then((response) => {
        return { response : response }
    })
}