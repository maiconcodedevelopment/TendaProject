import { initialStateUser } from "./state";



export default function actionUser(state = initialStateUser , action){

    switch (action.type) {
        case USER_LOGIIN_OR_REGISTER:
            return{
                ...state,
                ...action.payload
            }
            break;
        default:
            return state
            break;
    }
}

export const USER_LOGIIN_OR_REGISTER = "USER_LOGIIN_OR_REGISTER"

export const userSetState = (data) => ({
    type : USER_LOGIIN_OR_REGISTER,
    payload : data
})