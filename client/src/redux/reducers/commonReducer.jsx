import {GET_HEALTH_BULLETIN_DATA} from '../constants/constants'


const initState={
    healthBulletinData:null
}

export const  commonReducer=(state=initState,action)=>{
    switch(action.type){
  
        case GET_HEALTH_BULLETIN_DATA:{
            return Object.assign({},state,{
                healthBulletinData:action.payload,
          
              })
        }
        default:
            return state
    }
}