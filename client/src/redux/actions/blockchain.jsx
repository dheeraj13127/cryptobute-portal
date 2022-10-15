import {LOAD_CRYPTOBUTE_FACTORY_CONTRACT} from '../constants/constants'
export const loadTipogramContract = payload => async (dispatch) => {
	dispatch({
		type:LOAD_CRYPTOBUTE_FACTORY_CONTRACT ,
		payload: payload
	})
}