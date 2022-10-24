import axios from 'axios'
import { GET_HEALTH_BULLETIN_DATA } from '../constants/constants'

export const getHealthBulletinData = currDate => async (dispatch) => {
    const formatDate=(date)=> {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('/');
    }
    let config={
        headers:{
            'x-api-key': '0go1oqVs-TSlV8CFzej3jmYAmLaNh003w0QfAWiyUgM',
  
        }
    }
   await axios.get(`https://api.newscatcherapi.com/v2/search?q=health&lang=en&from=${formatDate(currDate)}&page_size=100`,config)
    .then(res=>{
        

        dispatch({
		type:GET_HEALTH_BULLETIN_DATA ,
		payload: res.data.articles
	})
    })
    .catch(err=>console.log(err))
	
}