import {LOAD_CRYPTOBUTE_FACTORY_CONTRACT,CREATE_NEW_FUNDRAISER, GET_FUNDRAISERS} from '../constants/constants'
import axios from 'axios'
import toast from 'react-hot-toast'
export const loadTipogramContract = payload => async (dispatch) => {
	dispatch({
		type:LOAD_CRYPTOBUTE_FACTORY_CONTRACT ,
		payload: payload
	})
}

export const createNewFundraiser=(response,navigate)=>async(dispatch)=>{
	await axios.post("http://localhost:5000/fundraiser/newFundraiser",response)
	.then(res=>{
		toast.success("Successfully created !")
		dispatch({
			type:CREATE_NEW_FUNDRAISER,
			payload:res.data.fundraiser
		})
		// setTimeout(()=>{
		// 	navigate("/")
		// },1500)
	})
	.catch(err=>toast.error("Something went wrong !"))	
	
}




export const getFundraisers=()=>async(dispatch)=>{
	await axios.get("http://localhost:5000/fundraiser/getFundraisers")
	.then(res=>{
		
		dispatch({
			type:GET_FUNDRAISERS,
			payload:res.data.fundraiser
		})
	
	})
	.catch(err=>toast.error("Something went wrong !"))	
}