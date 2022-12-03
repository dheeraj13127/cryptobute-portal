import React, { useState } from 'react'
import DashboardNavbar from '../../DashboardNavbar/DashboardNavbar'
import '../../../../../styles/DashboardStyles/ViewFundraiser.scss'
import { useParams } from 'react-router-dom'
import { Grid, Typography, Tooltip, Button, TextField, Modal, FormLabel } from '@mui/material'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cryptobute from '../../../../../blockchain/contractMaker/ContractMaker'
import {getFundraisers, spendAmount } from '../../../../../redux/actions/blockchain'
import SavingsIcon from '@mui/icons-material/Savings';
import matic from '../../../../../assets/logos/matic.png'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { Box, Stack } from '@mui/system'
import { useAccount } from 'wagmi'
import ScaleLoader from 'react-spinners/ScaleLoader'
import ProgressBar from '@ramonak/react-progress-bar'
import toast, { Toaster } from 'react-hot-toast'
import { create } from 'ipfs-http-client'
import MyFundraisersViewTable from './MyFundraisersViewTable/MyFundraisersViewTable'
import MyFundraisersViewSpendTable from './MyFundraisersViewSpendTable/MyFundraisersViewSpendTable'
const web3_utils = require('web3-utils');
const MAX_COUNT = 3;
function MyFundraisersView() {
    const allFundraisers = useSelector(state => state.blockchain.allFundraisers)
    const userId = sessionStorage.getItem("userId")

    const { id, mid } = useParams()
    const currentFundraiser = allFundraisers && allFundraisers.filter(x => x._id === mid)

    const dispatch = useDispatch()
    const [cbuteContract, setCbuteContract] = useState(null)
    const [collectedFund, setCollectedFund] = useState(0)
    const [contibuters, setContributers] = useState(0)
    const [amount, setAmount] = useState(0)

    useEffect(() => {

        fetchCamp()
        dispatch(getFundraisers())
    }, [])// eslint-disable-line react-hooks/exhaustive-deps 

    const fetchCamp = async () => {
        let cbute = Cryptobute(id)
        setCbuteContract(cbute)
        let collecFund = await cbute?.methods.collectedFund().call();
        setCollectedFund(collecFund)
        let contri = await cbute?.methods.approversCount().call();
        setContributers(contri)
      
    }
    const [spend, setSpend] = useState({
        spendReason:"",
        spendAmount:0,
        recipientName:"",
        recipientAddress:""
    })
    const [open, setOpen] = useState(false);
    const handleOpen = (contributors) =>{
        if(contributors.length===0){
            toast("You have no funds to spend ",{
                icon:"❗️"
              })
        }
        setOpen(true);
    } 
    const handleClose = () => setOpen(false);
    const {address} = useAccount()
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);
  

    const convertWei = () => {

        const newAmount = web3_utils.fromWei(String(collectedFund), "ether")
        return newAmount
    }
    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    toast.error(`You can upload maximum of ${MAX_COUNT} proofs`);
                    setFileLimit(true);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded)

    }
    const client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: `Basic ${Buffer.from(process.env.REACT_APP_IPFS_PROJECT_ID).toString(
                'base64'
            )}`,
        },
    })
    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)

        handleUploadFiles(chosenFiles);
    }

    const handleInputChange = (e) => {
        e.persist()
        setSpend((inp) => ({
            ...inp,
            [e.target.name]: e.target.value
        }))
    }

    const handleSpendSubmit = async(contributors) => {
        
        if (spend.recipientName === "" || spend.spendReason === "" || spend.spendAmount === 0 || uploadedFiles.length === 0||spend.recipientAddress==="") {
            toast("Please fill up the fields",{
                icon:"❗️"
              })
        }
        
        else if(spend.spendAmount>web3_utils.fromWei(collectedFund, "ether")){
            toast("Amount is greater than collected fund",{
                icon:"❗️"
              })
        }
        else{
            try{
                let upFiles=[]
              
                for(let i=0;i<uploadedFiles.length;i++){
                    let upFile=await client.add(uploadedFiles[i])
                    let upFilesUrl=`https://cryptobuteportal.infura-ipfs.io/ipfs/${upFile.path}`
                    upFiles.push(upFilesUrl)
                }
                const newAmount = web3_utils.toWei(spend.spendAmount, "ether")
                await cbuteContract.methods.createRequest(spend.spendReason,spend.recipientName,spend.recipientAddress).send({
                    from:address,
                    value:newAmount,
                    maxPriorityFeePerGas: null,
                    maxFeePerGas: null, 
                })
                .then(res=>{
                    
                    let spendId=res['events']['showRequestCount']['returnValues'].requestCount
                    let data={
                        description:spend.spendReason,
                        value:spend.spendAmount,
                        recipientName:spend.recipientName,
                        recipientAddress:spend.recipientAddress,
                        spendProofs:upFiles,
                        spendId:parseInt(spendId),
                        fid:mid

                    }
                    dispatch(spendAmount(data,contributors))
                })
                .catch(err=>{
                    console.log(err)
                    toast("Transaction failed",{
                        icon:"❗️"
                      })
                })

            }
            catch(e){
                console.log(e)
                    toast.error("Something went wrong !")
            }
        }
    }
    


    return (

        <div>
            <DashboardNavbar />
            <div className="viewFundraiserContainer">
                <div>
                    {currentFundraiser ? (
                        <>
                            {
                                currentFundraiser.map((cf, key) => (

                                    <Grid container gap={2} key={key} className="viewFundraiserContainerMainBox" >
                                        <Grid item xs={12} className="viewFundraiserContainerBox" >
                                            <div className="viewFundraiserPatientImgBox">
                                                <img src={cf.fundImage} alt="" className='viewFundraiserPatientImg' />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} className="viewFundraiserContainerBox" >
                                            <div className="viewFundraisersInfoBox">
                                                <Typography variant='h5' className='viewFundraiserTitle'><span className='viewFundraiserTitleSpan'>Fundraiser Title</span> : {cf.fundInfo}</Typography>
                                                <Typography variant='h6' className='viewFundraiserDesc'><span className='viewFundraiserDescSpan'>Fundraiser Description</span> : {cf.fundDescription}</Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={5} md={5} lg={2} className="viewFundraiserDetailsBox">
                                            <Tooltip title="Collected Fund">
                                                <SavingsIcon className='viewFundraiserCollectedFundIcon' />
                                            </Tooltip>
                                            &nbsp;
                                            {":"}&nbsp;
                                            <Button className='viewFundraiserCollectedFundInnerBox'>
                                                <Typography variant='body1' >{convertWei()}</Typography>
                                                <img src={matic} alt="matic" className='viewFundraiserMaticLogo' />
                                            </Button>

                                        </Grid>
                                        <Grid item xs={12} sm={5} md={5} lg={2} className="viewFundraiserDetailsBox">
                                            <Tooltip title="Requested Fund">
                                                <AccountBalanceIcon className='viewFundraiserTotalFundIcon' />
                                            </Tooltip>
                                            &nbsp;
                                            {":"}&nbsp;
                                            <Button className='viewFundraiserCollectedFundInnerBox'>
                                                <Typography variant='body1' >{cf.totalFund}</Typography>
                                                <img src={matic} alt="matic" className='viewFundraiserMaticLogo' />
                                            </Button>
                                        </Grid>

                                        <Grid item xs={12} sm={5} md={5} lg={2} className="viewFundraiserDetailsBox">
                                            <Tooltip title="Contributors">
                                                <Diversity3Icon className='viewFundraiserContributorIcon' />
                                            </Tooltip>
                                            &nbsp;
                                            {":"}&nbsp;
                                            <Button className='viewFundraiserCollectedFundInnerBox'>
                                                <Typography variant='body1' >{contibuters}</Typography>

                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="fundraisersPoolOneProgressBarBox">
                                                <Typography variant='h6' className='viewFundraiserMedicalProofsHeader'>Collected Fund :</Typography>
                                                <ProgressBar className='viewFundraiserProgressBar' completed={convertWei()} maxCompleted={cf.totalFund} labelSize="15px" height="20px" animateOnRender={true} />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant='h6' className='viewFundraiserMedicalProofsHeader'>Medical Proofs :</Typography>
                                        </Grid>
                                        <div className='viewFundraiserCardParentBox'>
                                            {
                                                cf.fundProofs.map((cfp, k) => (
                                                    <div key={k} className="viewFundraisersMedicalProofBox">
                                                        <img src={cfp} alt="" className='viewFundraisersMedicalProofImg' />
                                                    </div>
                                                ))
                                            }

                                        </div>
                                        
                                        <Grid item xs={12}>
                                            <div className='viewFundraiserDonateBtnBox'>
                                                <Button onClick={() => handleOpen(cf.contributors)} className='viewFundraiserDonateBtn'>
                                                    Spend Request
                                                </Button>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"

                                            >
                                                <Box className="viewFundraiserModal" width={300}>
                                                    <Stack>
                                                        <Typography variant='h6' className='viewFundraiserModalInfo'>Reason must be valid</Typography>
                                                        <TextField
                                                            label="Spend Reason"
                                                            type="text"
                                                            className="viewFundraiserInput"
                                                            name="spendReason"
                                                            required
                                                            onChange={handleInputChange}

                                                        />
                                                        <TextField
                                                            label="Amount to spend"
                                                            type="number"
                                                            className="viewFundraiserInput"
                                                            name="spendAmount"
                                                            required
                                                            onChange={handleInputChange}
                                                        />
                                                        <TextField
                                                            label="Recipient Name"
                                                            type="text"
                                                            className="viewFundraiserInput"
                                                            name="recipientName"
                                                            required
                                                            onChange={handleInputChange}
                                                        />
                                                        <TextField
                                                            label="Recipient Wallet Address"
                                                            type="text"
                                                            className="viewFundraiserInput"
                                                            name="recipientAddress"
                                                            required
                                                            onChange={handleInputChange}
                                                        />
                                                        <section className="newFundraiserUpload myFundraisersViewUpload">
                                                            <FormLabel id="demo-row-radio-buttons-group-label newFundraiserFileLabel">
                                                                Upload Medical Proofs
                                                            </FormLabel><br />
                                                            <input multiple required type="file" accept="image/*" onChange={handleFileEvent} disabled={fileLimit} />
                                                        </section>
                                                        <Button onClick={()=>handleSpendSubmit(cf.contributors)} className='viewFundraiserSendBtn'>Request</Button>
                                                    </Stack>

                                                </Box>
                                            </Modal>

                                        </Grid>
                                        <Grid item xs={12} lg={12}>
                                            <Typography variant='h6' className='viewFundraiserMedicalProofsHeader'>Contributors List :</Typography>
                                            <div className="myFundraiserViewTableBox">
                                                <MyFundraisersViewTable contributorsData={cf.contributors} />
                                            </div>

                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant='h6' className='viewFundraiserMedicalProofsHeader'>Spend Request Status :</Typography>
                                            <div className="myFundraiserViewTableBox">
                                                <MyFundraisersViewSpendTable contributorsData={cf.contributors} />
                                            </div>
                                        </Grid>
                                    </Grid>

                                ))
                            }
                        </>
                    ) : (<>

                        <div className='viewFundraiserLoaderBox'>
                            <ScaleLoader color="#6C97A9" loading={true} size={120} />
                        </div></>)}

                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    )
}

export default MyFundraisersView