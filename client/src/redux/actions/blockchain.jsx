import {
  LOAD_CRYPTOBUTE_FACTORY_CONTRACT,
  CREATE_NEW_FUNDRAISER,
  GET_FUNDRAISERS,
} from "../constants/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
const web3_utils = require("web3-utils");
export const loadTipogramContract = (payload) => async (dispatch) => {
  dispatch({
    type: LOAD_CRYPTOBUTE_FACTORY_CONTRACT,
    payload: payload,
  });
};

export const createNewFundraiser = (response, navigate) => async (dispatch) => {
	console.log(response);
  await axios
    .post(process.env.REACT_APP_BACKEND + "/fundraiser/newFundraiser", response)
    .then(async (res) => {
      let data = {
        walletAddress: response.walletAddress,
        fundId: res.data.fundraiser._id,
      };
      await axios
        .put(process.env.REACT_APP_BACKEND + "/fundraiser/updateFundsRaised", data)
        .then((resp) => {
          toast.success("Successfully created !");

          dispatch({
            type: CREATE_NEW_FUNDRAISER,
            payload: res.data.fundraiser,
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        })
        .catch((e) => toast.error("Something went wrong !"));
    })
    .catch((err) => toast.error("Something went wrong !"));
};

export const getFundraisers = () => async (dispatch) => {
  await axios
    .get(process.env.REACT_APP_BACKEND + "/fundraiser/getFundraisers")
    .then((res) => {
      dispatch({
        type: GET_FUNDRAISERS,
        payload: res.data.fundraiser,
      });
    })
    .catch((err) => toast.error("Something went wrong !"));
};

export const donateFundraiser =
  (address, amount, contract, mid, cid, signer, channelAddress) =>
  async (dispatch) => {
    const newAmount = web3_utils.toWei(amount, "ether");

    await contract.methods
      .contibute()
      .send({
        from: address,
        value: newAmount,
        maxPriorityFeePerGas: null,
        maxFeePerGas: null,
      })
      .then(async (res) => {
        const loggedInUser = await PushAPI.initialize(signer, {
          env: CONSTANTS.ENV.STAGING,
        });
        loggedInUser.notification.subscribe(channelAddress);

        let data = {
          mid: mid,
          cid: cid,
          walletAddress: address,
          amount: amount,
          thash: res.transactionHash,
        };
        await axios
          .put(process.env.REACT_APP_BACKEND + "/fundraiser/updateFundraiser", data)
          .then((resp) => {
            toast("Thanks for the help", {
              icon: "🤝",
            });
            setTimeout(() => {
              window.location.reload(false);
            }, 2000);
          })
          .catch((err) => toast.error("Something went wrong !"));
      })
      .catch((err) => {
        toast.error("Something went wrong !");
      });
  };

export const spendAmount = (data, contributors, signer) => async (dispatch) => {
  console.log(contributors);

  await axios
    .put(process.env.REACT_APP_BACKEND + "/fundraiser/updateSpendRequests", data)
    .then(async (res) => {
      for (let i = 0; i < contributors.length; i++) {
        await axios
          .put(
            `http://localhost:7000/user/sendSpendNotifications/${contributors[i].walletAddress}`,
            data
          )
          .then((resp) => {})
          .catch((e) => {});
      }
      const loggedInUser = await PushAPI.initialize(signer, {
        env: CONSTANTS.ENV.STAGING,
      });
	  console.log(contributors);
      loggedInUser.channel.send(contributors, {
        notification: { title: "Spend Request", body: data.description },
      });
    })
    .catch((err) => {
      toast.error("Something went wrong !");
    });
};

export const spendCollectedAmount = (response) => async (dispatch) => {
  await axios
    .post(process.env.REACT_APP_BACKEND + "/fundraiser/spendAmount", response)
    .then((res) => {
      toast.success("Amount spent successfully !");
      setTimeout(() => {
        window.location.reload(false);
      }, 1500);
    })
    .catch((err) => toast.error("Something went wrong !"));
};
