import {GET_PROFILE} from '../constants/constants'


const initState={
   userData:null
}

export const  authReducer=(state=initState,action)=>{
    switch(action.type){
  
        case GET_PROFILE:{
            return Object.assign({},state,{
                userData:action.payload,
          
              })
        }
  
        default:
            return state
    }
}