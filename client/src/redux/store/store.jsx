import {applyMiddleware,legacy_createStore as createStore,combineReducers} from 'redux'
import {blockchainReducer} from '../reducers/blockchainReducer'
import {commonReducer} from '../reducers/commonReducer'
import {authReducer} from '../reducers/authReducer'
import thunk from 'redux-thunk'

const rootReducer=combineReducers({blockchain:blockchainReducer,common:commonReducer,auth:authReducer})

export const store=createStore(rootReducer,applyMiddleware(thunk))