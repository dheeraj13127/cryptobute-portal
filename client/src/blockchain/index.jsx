import React, { useEffect } from "react";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { CRYPTOBUTE_FACTORY_CONTRACT } from "./contractProvider/ContractProvider";
import { loadTipogramContract } from "../redux/actions/blockchain";
function BlockchainProvider() {
  const dispatch = useDispatch();
  const contract = useSelector((x) => x.blockchain.crytobuteFactoryContract);

  useEffect(() => {
    const web3 = new Web3(Web3.givenProvider);
    try {
      const cryptobuteFactoryContract = new web3.eth.Contract(
        CRYPTOBUTE_FACTORY_CONTRACT.abi,
        CRYPTOBUTE_FACTORY_CONTRACT.address
      );
      console.log(contract);
      dispatch(loadTipogramContract(cryptobuteFactoryContract));
    } catch (err) {
      console.log(err);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div></div>;
}

export default BlockchainProvider;
