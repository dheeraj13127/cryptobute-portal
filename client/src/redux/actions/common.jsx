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
    
        return [year, month, day].join('-');
    }
   await axios.get(`https://newsapi.org/v2/everything?q=health&apiKey=4a89bef614eb4287a6ae9f0b90adedb3`)
    .then(res=>{
        console.log(res)
        dispatch({
		type:GET_HEALTH_BULLETIN_DATA ,
		payload: res.data.articles
	})
    })
    .catch(err=>console.log(err))
	
}