import { Button, FormLabel, Grid, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import '../../../../../styles/DashboardStyles/NewFundraiser.scss'
import toast, { Toaster } from "react-hot-toast";
import { create } from 'ipfs-http-client'
import { useSelector,useDispatch } from 'react-redux'
import { useAccount } from 'wagmi'
import { createNewFundraiser } from '../../../../../redux/actions/blockchain';
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import { getUserProfile } from '../../../../../redux/actions/auth';
const MAX_COUNT = 5;
function NewFundraiserForm() {
    const userId=sessionStorage.getItem("userId")
    
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [user, setUser] = useState({
        totalFund: '',
        fundTitle: "",
        fundDescription: "",
    })
    const cbuteFactoryContract=useSelector(state=>state.blockchain.crytobuteFactoryContract)
    const {address}=useAccount()
    const [fundraiserThumbnail, setFundraiserThumbnail] = useState("")
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);
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
    useEffect(()=>{
        dispatch(getUserProfile(address))
      },[]) // eslint-disable-line react-hooks/exhaustive-deps 
    const userData=useSelector(state=>state.auth.userData)
    const handleInputChange = (e) => {
        e.persist()
        setUser((inp) => ({
            ...inp,
            [e.target.name]: e.target.value
        }))
    }
    const handleSignUpSubmit = async(e) => {
        e.preventDefault()
        if (user.totalFund === undefined || user.fundTitle === "" || user.fundDescription === "" || fundraiserThumbnail === "" || uploadedFiles.length === 0) {
            toast("Please fill up the fields",{
                icon:"❗️"
              })
        }
        else{
            try{
                let upFiles=[]
                const fundThumbnail=await client.add(fundraiserThumbnail)
                const fundThumbnailUrl=`https://cryptobuteportal.infura-ipfs.io/ipfs/${fundThumbnail.path}`
                for(let i=0;i<uploadedFiles.length;i++){
                    let upFile=await client.add(uploadedFiles[i])
                    let upFilesUrl=`https://cryptobuteportal.infura-ipfs.io/ipfs/${upFile.path}`
                    upFiles.push(upFilesUrl)
                }
             
                await cbuteFactoryContract.methods.createCampaign(user.totalFund).send({
                    from:address,
                    maxPriorityFeePerGas: null,
                    maxFeePerGas: null, 
                })
                .then(res=>{
                    
                    let newContractAdd=res['events']['NewDeployedAddress']['returnValues'].deployedAddress
                    let data={
                        walletAddress:userId,
                        contractAddress:newContractAdd,
                        fundInfo:user.fundTitle,
                        fundDescription:user.fundDescription,
                        fundImage:fundThumbnailUrl,
                        fundProofs:upFiles,
                        totalFund:user.totalFund,
                        userImg:userData&&userData.profileImg,
                        userName:address,
                        contributors:[],
                        spendRequests:[]
                    }
                    dispatch(createNewFundraiser(data,navigate))
                    
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

    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)

        handleUploadFiles(chosenFiles);
    }
    return (
        <>
            <Grid item xs={12} sm={2} md={2} lg={3} xl={4}></Grid>
            <Grid item xs={12} sm={8} md={8} lg={6} xl={4} className="newFundraiserBox">

                <form autoComplete="off" >
                    <Stack className="newFundraiserFormBox" spacing={2}>


                        <TextField
                            label="Total Fund Required"
                            type="number"
                            className="newFundraiserInput"
                            name="totalFund"
                            value={user.totalFund}
                            onChange={handleInputChange}
                            required
                        />

                      
                        <TextField
                            label="Fundraiser Title"
                            type="text"
                            name="fundTitle"
                            className="newFundraiserInput"
                            value={user.fundTitle}
                            onChange={handleInputChange}
                            required

                        />
                        <TextField
                            label="Fundraiser Description"
                            type="text"
                            name="fundDescription"
                            className="newFundraiserInput"
                            value={user.fundDescription}
                            onChange={handleInputChange}
                            required
                        />

                        <section className="newFundraiserUpload">
                            <FormLabel id="demo-row-radio-buttons-group-label newFundraiserFileLabel">
                                Upload Patients Image
                            </FormLabel><br />
                            <input required type="file" accept="image/*" onChange={e => setFundraiserThumbnail(e.target.files[0])} />
                        </section>
                        <section className="newFundraiserUpload">
                            <FormLabel id="demo-row-radio-buttons-group-label newFundraiserFileLabel">
                                Upload Medical Proofs
                            </FormLabel><br />
                            <input multiple required type="file" accept="image/*" onChange={handleFileEvent} disabled={fileLimit} />
                        </section>

                        <Button onClick={handleSignUpSubmit} variant="contained" color="primary" className="newFundraiserSubmitBtn">
                            Create
                        </Button>

                    </Stack>
                </form>
                <Toaster position="top-center" reverseOrder={false} />
            </Grid>
        </>
    )
}

export default NewFundraiserForm