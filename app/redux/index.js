import { combineReducers , createStore } from 'redux';
import  actionProducts  from "../redux/actions/Products"

let actionsCombine = combineReducers({
   products : actionProducts
})

export let storeRedux = createStore(actionsCombine)