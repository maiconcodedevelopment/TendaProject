import { combineReducers , createStore } from 'redux';
import actionProducts  from "../redux/actions/Products"
import actionUser from "../redux/actions/Users"

let actionsCombine = combineReducers({
   products : actionProducts,
   user : actionUser
})

export let storeRedux = createStore(actionsCombine)