import axios from 'axios'
import { GET_HEALTH_BULLETIN_DATA } from '../constants/constants'

export const getHealthBulletinData = currDate => async (dispatch) => {
   
    let config={
        headers:{
            'x-api-key': '3fCOY3KW04rSSk7K2RhLOJNpe3_dxNGVc27FELEIBt0',
  
        }
    }
   await axios.get(`https://api.newscatcherapi.com/v2/search?q=health&lang=en&from='2022/10/22'&page_size=100`,config)
    .then(res=>{
        

        dispatch({
		type:GET_HEALTH_BULLETIN_DATA ,
		payload: res.data.articles
	})
    })
    .catch(err=>console.log(err))
	
}