import { LOAD_CRYPTOBUTE_FACTORY_CONTRACT, CREATE_NEW_FUNDRAISER, GET_FUNDRAISERS } from '../constants/constants'
import axios from 'axios'
import toast from 'react-hot-toast'
const web3_utils = require('web3-utils');
export const loadTipogramContract = payload => async (dispatch) => {
	dispatch({
		type: LOAD_CRYPTOBUTE_FACTORY_CONTRACT,
		payload: payload
	})
}

export const createNewFundraiser = (response, navigate) => async (dispatch) => {

	await axios.post("http://localhost:7000/fundraiser/newFundraiser", response)
		.then(async (res) => {
			let data = {
				userId: response.userId,
				fundId: res.data.fundraiser._id
			}
			await axios.put("http://localhost:7000/fundraiser/updateFundsRaised", data)
				.then(resp => {
					toast.success("Successfully created !")

					dispatch({
						type: CREATE_NEW_FUNDRAISER,
						payload: res.data.fundraiser
					})
					setTimeout(() => {
						navigate("/")
					}, 1500)
				})
				.catch(e => toast.error("Something went wrong !"))


		})
		.catch(err => toast.error("Something went wrong !"))

}




export const getFundraisers = () => async (dispatch) => {
	await axios.get("http://localhost:7000/fundraiser/getFundraisers")
		.then(res => {

			dispatch({
				type: GET_FUNDRAISERS,
				payload: res.data.fundraiser
			})

		})
		.catch(err => toast.error("Something went wrong !"))
}

export const donateFundraiser = (address, amount, contract, userId, mid, cid) => async (dispatch) => {
	
	const newAmount = web3_utils.toWei(amount, "ether")

	await contract.methods.contibute().send({
		from: address, value: newAmount, maxPriorityFeePerGas: null,
		maxFeePerGas: null,
	})
		.then(async (res) => {
			let data = {
				userId: userId,
				mid: mid,
				cid: cid,
				walletAddress:address,
				amount:amount,
				thash:res.transactionHash
				
			}
			await axios.put("http://localhost:7000/fundraiser/updateFundraiser", data)
				.then(resp => {
					toast("Thanks for the help", {
						icon: "🤝"
					})
					setTimeout(() => {
						window.location.reload(false)
					}, 2000)


				})
				.catch(err => toast.error("Something went wrong !"))
		})
		.catch(err => {
			toast.error("Something went wrong !")
		})
}

export const spendAmount = (data,contributors) => async (dispatch) => {
	


	await axios.put("http://localhost:7000/fundraiser/updateSpendRequests",data)
		.then(async (res) => {
			for(let i=0;i<contributors.length;i++){
				await axios.put(`http://localhost:7000/user/sendSpendNotifications/${contributors[i].userId}`,data)
				.then(resp=>{
					
				})
				.catch(e=>{

				})
			}
		})
		.catch(err => {
			toast.error("Something went wrong !")
		})
}