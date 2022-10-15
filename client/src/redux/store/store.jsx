import {applyMiddleware,legacy_createStore as createStore,combineReducers} from 'redux'
import {blockchainReducer} from '../reducers/blockchainReducer'
import {commonReducer} from '../reducers/commonReducer'
import thunk from 'redux-thunk'

const rootReducer=combineReducers({blockchain:blockchainReducer,common:commonReducer})

export const store=createStore(rootReducer,applyMiddleware(thunk))