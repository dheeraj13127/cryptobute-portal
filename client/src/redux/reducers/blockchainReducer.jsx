import {LOAD_CRYPTOBUTE_FACTORY_CONTRACT} from '../constants/constants'


const initState={
    crytobuteFactoryContract:null
}

export const  blockchainReducer=(state=initState,action)=>{
    switch(action.type){
  
        case LOAD_CRYPTOBUTE_FACTORY_CONTRACT:{
            return Object.assign({},state,{
                crytobuteFactoryContract:action.payload,
          
              })
        }
        default:
            return state
    }
}