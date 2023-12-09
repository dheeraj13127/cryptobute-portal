import React, { useState } from "react";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import "../../../../styles/DashboardStyles/ViewFundraiser.scss";
import { useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  Tooltip,
  Button,
  TextField,
  Modal,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cryptobute from "../../../../blockchain/contractMaker/ContractMaker";
import {
  donateFundraiser,
  getFundraisers,
} from "../../../../redux/actions/blockchain";
import SavingsIcon from "@mui/icons-material/Savings";
import matic from "../../../../assets/logos/matic.png";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { Box, Stack } from "@mui/system";
import { useAccount } from "wagmi";
import ScaleLoader from "react-spinners/ScaleLoader";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSigner } from "wagmi";
import { Toaster } from "react-hot-toast";

const web3_utils = require("web3-utils");
function ViewFundraiser() {
  const allFundraisers = useSelector(
    (state) => state.blockchain.allFundraisers
  );
  const userId = sessionStorage.getItem("userId");

  const { id, mid } = useParams();
  const currentFundraiser =
    allFundraisers && allFundraisers.filter((x) => x._id === mid);
  const dispatch = useDispatch();
  const [cbuteContract, setCbuteContract] = useState(null);
  const [collectedFund, setCollectedFund] = useState(0);
  const [contibuters, setContributers] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetchCamp();
    dispatch(getFundraisers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCamp = async () => {
    let cbute = Cryptobute(id);
    setCbuteContract(cbute);
    let collecFund = await cbute?.methods.collectedFund().call();
    setCollectedFund(collecFund);
    let contri = await cbute?.methods.approversCount().call();
    setContributers(contri);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const handleDonateFund = (cid) => {
    dispatch(donateFundraiser(address, amount, cbuteContract, mid, cid,signer,currentFundraiser.channelAddress));
  };

  const convertWei = () => {
    const newAmount = web3_utils.fromWei(String(collectedFund), "ether");
    return newAmount;
  };

  return (
    <div>
      <DashboardNavbar />
      <div className="viewFundraiserContainer">
        <div>
          {currentFundraiser ? (
            <>
              {currentFundraiser.map((cf, key) => (
                <Grid
                  container
                  gap={2}
                  key={key}
                  className="viewFundraiserContainerMainBox"
                >
                  <Grid item xs={12} className="viewFundraiserContainerBox">
                    <div className="viewFundraiserPatientImgBox">
                      <img
                        src={cf.fundImage}
                        alt=""
                        className="viewFundraiserPatientImg"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} className="viewFundraiserContainerBox">
                    <div className="viewFundraisersInfoBox">
                      <Typography variant="h5" className="viewFundraiserTitle">
                        <span className="viewFundraiserTitleSpan">
                          Fundraiser Title
                        </span>{" "}
                        : {cf.fundInfo}
                      </Typography>
                      <Typography variant="h6" className="viewFundraiserDesc">
                        <span className="viewFundraiserDescSpan">
                          Fundraiser Description
                        </span>{" "}
                        : {cf.fundDescription}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={5}
                    md={5}
                    lg={2}
                    className="viewFundraiserDetailsBox"
                  >
                    <Tooltip title="Collected Fund">
                      <SavingsIcon className="viewFundraiserCollectedFundIcon" />
                    </Tooltip>
                    &nbsp;
                    {":"}&nbsp;
                    <Button className="viewFundraiserCollectedFundInnerBox">
                      <Typography variant="body1">{convertWei()}</Typography>
                      <img
                        src={matic}
                        alt="matic"
                        className="viewFundraiserMaticLogo"
                      />
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={5}
                    md={5}
                    lg={2}
                    className="viewFundraiserDetailsBox"
                  >
                    <Tooltip title="Requested Fund">
                      <AccountBalanceIcon className="viewFundraiserTotalFundIcon" />
                    </Tooltip>
                    &nbsp;
                    {":"}&nbsp;
                    <Button className="viewFundraiserCollectedFundInnerBox">
                      <Typography variant="body1">{cf.totalFund}</Typography>
                      <img
                        src={matic}
                        alt="matic"
                        className="viewFundraiserMaticLogo"
                      />
                    </Button>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={5}
                    md={5}
                    lg={2}
                    className="viewFundraiserDetailsBox"
                  >
                    <Tooltip title="Contributors">
                      <Diversity3Icon className="viewFundraiserContributorIcon" />
                    </Tooltip>
                    &nbsp;
                    {":"}&nbsp;
                    <Button className="viewFundraiserCollectedFundInnerBox">
                      <Typography variant="body1">{contibuters}</Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="fundraisersPoolOneProgressBarBox">
                      <Typography
                        variant="h6"
                        className="viewFundraiserMedicalProofsHeader"
                      >
                        Collected Fund :
                      </Typography>
                      <ProgressBar
                        className="viewFundraiserProgressBar"
                        completed={convertWei()}
                        maxCompleted={cf.totalFund}
                        labelSize="15px"
                        height="20px"
                        animateOnRender={true}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      className="viewFundraiserMedicalProofsHeader"
                    >
                      Medical Proofs :
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="viewFundraiserCardParentBox">
                      {cf.fundProofs.map((cfp, k) => (
                        <div key={k} className="viewFundraisersMedicalProofBox">
                          <img
                            src={cfp}
                            alt=""
                            className="viewFundraisersMedicalProofImg"
                          />
                        </div>
                      ))}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="">
                      <Typography
                        variant="h6"
                        className="viewFundraiserMedicalProofsHeader"
                      >
                        Fund raised by :
                      </Typography>
                      <div className="viewFundraiserFundRaisedBox">
                        <img
                          className="viewFundraiserFundRaisedImg"
                          src={cf.userImg}
                          alt=""
                        />
                        <Tooltip title={cf.userName}>
                          <Typography
                            variant="h6"
                            className="viewFundraiserFundRaisedName"
                          >
                            {cf.userName}
                          </Typography>
                        </Tooltip>
                      </div>
                    </div>
                  </Grid>
                  {cf.userName !== address && (
                    <Grid item xs={12}>
                      <div className="viewFundraiserDonateBtnBox">
                        <Button
                          onClick={() => handleOpen()}
                          className="viewFundraiserDonateBtn"
                        >
                          Donate
                        </Button>
                      </div>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className="viewFundraiserModal">
                        <Stack>
                          <Typography
                            variant="h6"
                            className="viewFundraiserModalInfo"
                          >
                            That's a Good Decision 😃
                          </Typography>
                          <TextField
                            label="Enter in MATIC"
                            type="number"
                            className="viewFundraiserInput"
                            name="minContribution"
                            required
                            onChange={(e) => setAmount(e.target.value)}
                          />
                          <Button
                            onClick={() => handleDonateFund(cf._id)}
                            className="viewFundraiserSendBtn"
                          >
                            Send
                          </Button>
                        </Stack>
                      </Box>
                    </Modal>
                  </Grid>
                </Grid>
              ))}
            </>
          ) : (
            <>
              <div className="viewFundraiserLoaderBox">
                <ScaleLoader color="#6C97A9" loading={true} size={120} />
              </div>
            </>
          )}
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default ViewFundraiser;
