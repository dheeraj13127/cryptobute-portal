import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../../../redux/actions/auth'
import LaunchIcon from '@mui/icons-material/Launch';
import '../../../../styles/DashboardStyles/NotificationSection.scss'
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertTitle, Button, Grid, Typography } from '@mui/material'
import { useAccount } from 'wagmi'
import { Toaster } from 'react-hot-toast';
import { approveSpendRequest, rejectSpendRequest } from '../../../../redux/actions/common';
import { getFundraisers } from '../../../../redux/actions/blockchain';
import Cryptobute from '../../../../blockchain/contractMaker/ContractMaker'
function NotificationSection() {

  const dispatch = useDispatch()

  const userId = sessionStorage.getItem("userId")
  const { address } = useAccount()
  // const myFundraisers = allFundraisers && allFundraisers.filter(x => x.userId === userId)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getUserProfile(address))
  }, [])// eslint-disable-line react-hooks/exhaustive-deps 


  const userData = useSelector(state => state.auth.userData)
  const onHandleReject=(spendId)=>{
    const data={
      walletAddress:address,
      spendId:spendId
    }
    dispatch(rejectSpendRequest(data))

  }

  const onHandleAccept=async(spendId,cid)=>{
    let cbute =  Cryptobute(cid)
    await cbute.methods.approveRequest(spendId).send({
      from:address,
      maxPriorityFeePerGas: null,
      maxFeePerGas: null, 
    })
    .then(res=>{
      const data={
        walletAddress:address,
        spendId:spendId
      }
      dispatch(approveSpendRequest(data))
    })
  }
  return (
    <div>
      <DashboardNavbar />
      <div className='notificationContainer'>
        <Grid container className="notificationGrid">
          {userData&&userData.notifications.length!==0? (
            <>
              {
                userData && userData.notifications.map((no, i) => (
                  <Grid item xs={12} key={i}>
                    <Alert severity="info" className='notificationAlert'>
                      <AlertTitle>{no.description}</AlertTitle>
                      <div><strong>Spend Request From : </strong>{no.spendRequestFrom} <span> <a href={`/dashboard/viewFundraiser/${no.cid}/${no.fid}`} className='navigatingLink'><LaunchIcon className='notificationSectionLaunchIcon'/></a></span></div>
                      <div><strong>Amount to spend : </strong>{no.value}</div>
                      <div><strong>Recipient Name : </strong>{no.recipientName}</div>
                      <div><strong>Recipient Address : </strong>{no.recipientAddress}</div>
                      <div><strong>Medical Proofs : </strong> </div>
                      {
                        no.spendProofs.map((sp,k)=>(
                          
                          <a key={k} target="_blank" rel='noopener noreferrer' href={sp} className="navigatingLink">
                            <Button className='notificationSectionImgViewBtn' size="small">View</Button>
                          </a>
                          
                        ))
                      }

                      <div className='notificationSectionStatusBox'>
                      <Button className='notificationSectionApproveBtn' size="small" onClick={()=>onHandleAccept(no.spendId,no.cid)}>Approve</Button>
                      <Button className='notificationSectionRejectBtn' size="small" onClick={()=>onHandleReject(no.spendId)}>Reject</Button>
                      </div>


                    </Alert>
                  </Grid>
                ))
              }
            </>
          ) : (
            <>
              <Grid item xs={12}>
              <div className="notificationSectionEmptyBox">
                <Typography className="notificationSectionEmptyTitle" >You don't have any notifications</Typography>
              </div>
              </Grid>
            </>
          )}


        </Grid>

      </div>
      <Toaster position="top-center" reverseOrder={false} />

    </div>
  )
}

export default NotificationSection