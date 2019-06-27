import { initialStateUser } from "./state";



export default function actionUser(state = initialStateUser , action){

    console.log(action)

    switch (action.type) {
        case USER_LOGIIN_OR_REGISTER:

            return {
                ...state,
                ...action.payload
            }
            break;
        case USER_INCREMENT_PRODUCT :
            let productsUpdate = state.products.filter(product => product.id === action.payload.id)[0]

            let productUpdateIncrement = {
                ...productsUpdate,
                ...action.payload
            }


            productsUpdate = state.products.map(product => {
                if(product.id === productUpdateIncrement.id){
                    return productUpdateIncrement
                }else{
                    return product
                }
            } )
            
            return {
                ...state,
                products : productsUpdate
            }
            break;
        case USER_TOTAL_PRODUCTS :
            return {
                ...state,
                total :  state.products.reduce((sum,i) => sum + i.price ,0)
            }
        case USER_ADD_AND_REMOVE_PRODUCT :

            if(state.products.filter(product => product.id === action.payload.id).length > 0){
                    var productsRemove = state.products.filter(product => product.id !== action.payload.id)

                return {
                    ...state,
                    products : productsRemove 
                }
            }

            return {
                ...state,
                products : [...state.products,action.payload]
            }
        case USER_CLEAR_PRODUCTS:
            return {
                ...state,
                products : action.payload
            }
        default:
            return state
            break;
    }
}

export const USER_LOGIIN_OR_REGISTER = "USER_LOGIIN_OR_REGISTER"
export const USER_TOTAL_PRODUCTS = "USER_TOTAL_PRODUCTS"
export const USER_INCREMENT_PRODUCT = "USER_INCREMENT_PRODUCT"
export const USER_ADD_AND_REMOVE_PRODUCT = "USER_ADD_AND_REMOVE_PRODUCT"
export const USER_CLEAR_PRODUCTS = "USER_CLEAR_PRODUCTS"

export const userSetState = (data) => ({
    type : USER_LOGIIN_OR_REGISTER,
    payload : data
})

export const userToalProducts = (data) => ({
    type : USER_TOTAL_PRODUCTS,
    payload : data
})

export const userIncrementProduct = (data) => ({
    type : USER_INCREMENT_PRODUCT,
    payload : data
})

export const userAddAndRemoveProduct = (data) => ({
    type : USER_ADD_AND_REMOVE_PRODUCT,
    payload : data
})

export const userClearProducts = (data) => ({
    type : USER_CLEAR_PRODUCTS,
    payload : data
})