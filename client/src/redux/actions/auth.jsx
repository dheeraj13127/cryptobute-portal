import axios from 'axios'
import toast from 'react-hot-toast'
import { GET_PROFILE } from '../constants/constants'

export const userGetStarted = (data,navigate) => async (dispatch) => {
 
	await axios.post("http://localhost:7000/user/getStarted",data)
		.then(res => {
                toast.success("Welcome !")
                sessionStorage.setItem("userId",data.walletAddress) 
                setTimeout(()=>{
                    navigate("/dashboard")
                },1500)
			
		})
		.catch(err => toast.error("Something went wrong !"))
}



export const getUserProfile = (walletAddress) => async (dispatch) => {
    let data={
        walletAddress:walletAddress
    }
	await axios.post("http://localhost:7000/user/getStarted",data)
		.then(res => {
            dispatch({
                type:GET_PROFILE,
                payload:res.data.user
            })
			
		})
		.catch(err => toast.error("Something went wrong !"))
}