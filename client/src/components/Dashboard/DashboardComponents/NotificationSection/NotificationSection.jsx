import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../../redux/actions/auth";
import LaunchIcon from "@mui/icons-material/Launch";
import "../../../../styles/DashboardStyles/NotificationSection.scss";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Button, Grid, Typography } from "@mui/material";
import { useAccount } from "wagmi";
import { Toaster } from "react-hot-toast";
import {
  approveSpendRequest,
  rejectSpendRequest,
} from "../../../../redux/actions/common";
import { getFundraisers } from "../../../../redux/actions/blockchain";
import Cryptobute from "../../../../blockchain/contractMaker/ContractMaker";
import Web3 from "web3";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
import { useSigner } from "wagmi";

function NotificationSection() {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState();
  const { data: signer, isError, isLoading } = useSigner();
  const userId = sessionStorage.getItem("userId");
  const { address } = useAccount();
  // const myFundraisers = allFundraisers && allFundraisers.filter(x => x.userId === userId)
  const navigate = useNavigate();

  const getNotificationList = async () => {
    const loggedInUser = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });

    const notificationList = await loggedInUser.notification.list("INBOX");
    console.log("notificationList", notificationList);
    setNotifications(notificationList);
  };

  useEffect(() => {
    dispatch(getUserProfile(address));
  }, []);
  // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (signer) {
      getNotificationList();
    }
  }, [signer]);
  const userData = useSelector((state) => state.auth.userData);
  const onHandleReject = (spendId) => {
    const data = {
      walletAddress: address,
      spendId: spendId,
    };
    dispatch(rejectSpendRequest(data));
  };

  const onHandleAccept = async (spendId, cid) => {
    let cbute = Cryptobute(cid);
    await cbute.methods
      .approveRequest(spendId)
      .send({
        from: address,
        maxPriorityFeePerGas: null,
        maxFeePerGas: null,
      })
      .then((res) => {
        const data = {
          walletAddress: address,
          spendId: spendId,
        };
        dispatch(approveSpendRequest(data));
      });
  };
  return (
    <div>
      <DashboardNavbar />
      <div className="notificationContainer">
        <Grid container className="notificationGrid">
          {notifications && notifications.length !== 0 ? (
            <>
              {notifications.map((no, i) => (
                <Grid item xs={12} key={i}>
                  <Alert severity="info" className="notificationAlert">
                    <AlertTitle>{no.description}</AlertTitle>
                    <div>
                      <strong>Spend Request From : </strong>
                      {no.title}{" "}
                      <span>
                        {" "}
                        <a
                          href={`/dashboard/viewFundraiser/${no.cid}/${no.fid}`}
                          className="navigatingLink"
                        >
                          <LaunchIcon className="notificationSectionLaunchIcon" />
                        </a>
                      </span>
                    </div>
                    <div>{no.message}</div>
                    <div>
                      <strong>Medical Proofs : </strong>{" "}
                    </div>

                    <div className="notificationSectionStatusBox">
                      <Button
                        className="notificationSectionApproveBtn"
                        size="small"
                        onClick={() => onHandleAccept(no.spendId, no.cid)}
                      >
                        Approve
                      </Button>
                      <Button
                        className="notificationSectionRejectBtn"
                        size="small"
                        onClick={() => onHandleReject(no.spendId)}
                      >
                        Reject
                      </Button>
                    </div>
                  </Alert>
                </Grid>
              ))}
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <div className="notificationSectionEmptyBox">
                  <Typography className="notificationSectionEmptyTitle">
                    You don't have any notifications
                  </Typography>
                </div>
              </Grid>
            </>
          )}
        </Grid>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default NotificationSection;
