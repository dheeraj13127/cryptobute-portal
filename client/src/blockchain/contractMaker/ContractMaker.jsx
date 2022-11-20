
import Web3 from "web3";
import { CRYPTOBUTE_CONTRACT } from '../contractProvider/ContractProvider';
// eslint-disable-next-line import/no-anonymous-default-export
export default (address) => {
    const web3 = new Web3(Web3.givenProvider);
    const CryptobuteContract = new web3.eth.Contract(
        CRYPTOBUTE_CONTRACT.abi, address)
    return CryptobuteContract

}