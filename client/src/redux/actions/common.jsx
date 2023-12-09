import axios from 'axios'
import toast from 'react-hot-toast';
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
            'x-api-key': 'WPMA_kcgvt1g5RXeUCCKbbDeV2GckJLMnAu5ao2yIsA',
  
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

export const rejectSpendRequest = (response) => async (dispatch) => {
 
	await axios.put(process.env.REACT_APP_BACKEND + "/fundraiser/rejectSpendRequests",response)
		.then(res => {
           toast.success("You have rejected the request")
           setTimeout(()=>{
            window.location.reload(false)
           },1500)
			
		})
		.catch(err => toast.error("Something went wrong !"))
}

export const approveSpendRequest = (response) => async (dispatch) => {
 
	await axios.put(process.env.REACT_APP_BACKEND + "/fundraiser/rejectSpendRequests",response)
		.then(res => {
           toast.success("You have approved the request")
           setTimeout(()=>{
            window.location.reload(false)
           },1500)
      
			
		})
		.catch(err => toast.error("Something went wrong !"))
}