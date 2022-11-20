import {LOAD_CRYPTOBUTE_FACTORY_CONTRACT,CREATE_NEW_FUNDRAISER,GET_FUNDRAISERS} from '../constants/constants'


const initState={
    crytobuteFactoryContract:null,
    newFundraiser:null,
    allFundraisers:null
}

export const  blockchainReducer=(state=initState,action)=>{
    switch(action.type){
  
        case LOAD_CRYPTOBUTE_FACTORY_CONTRACT:{
            return Object.assign({},state,{
                crytobuteFactoryContract:action.payload,
          
              })
        }
        case CREATE_NEW_FUNDRAISER:{
            return Object.assign({},state,{
                newFundraiser:action.payload,
          
              })
        }
        case GET_FUNDRAISERS:{
            return Object.assign({},state,{
         
                allFundraisers:action.payload,
          
              })
        }
        default:
            return state
    }
}