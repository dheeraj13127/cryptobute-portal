import { Button, Grid } from '@mui/material'
import React from 'react'
import '../../../styles/AuthenticationStyles/GetStarted.scss'
import AuthenticationNavbar from '../AuthenticationNavbar/AuthenticationNavbar'
import getstartedimg from  '../../../assets/other/getstarted.png'
import { useWeb3Modal } from '@web3modal/react'
import {useAccount,useDisconnect} from 'wagmi'
import {useDispatch} from 'react-redux'
import { userGetStarted } from '../../../redux/actions/auth'
import { AvatarGenerator } from 'random-avatar-generator';
import { Toaster } from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { LandingFooter } from '../../Landing'
function GetStarted() {
    const { open } = useWeb3Modal()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const { isConnected,address } = useAccount()
    const {disconnect} = useDisconnect()
    const connectHandler = async () => {
        open()
      }
    const connectUser=()=>{
       
        const generator = new AvatarGenerator();
        let x=generator.generateRandomAvatar(address);
        let data={
            walletAddress:address,
            profileImg:x,
            fundsRaised:[],
            fundsDonated:[],
            notifications:[]
            
        }
         dispatch(userGetStarted(data,navigate))

    }
  return (
    <div>
        <AuthenticationNavbar/>
        <div className="getStartedContainer">
            <Grid className='getStartedContainerBox' container>
                <Grid item xs={12} md={12} lg={12} xl={6}>
                    <div className="getStartedImgBox">
                    <img src={getstartedimg} alt="getstartedImg" className='getstartedImg'/>
                    </div>
         
                </Grid>
                <Grid item xs={12} lg={6}>
                    <div className="getStartedBtnBox">{
                        !isConnected?(
                            <Button onClick={connectHandler} size="large" className="getStartedBtn">
                            Connect Wallet
                          </Button>
                        ):(
                            <Button onClick={connectUser} size="large" className="getStartedBtn">
                            Proceed
                          </Button>
                        )
                    }
                   
                    </div>
                </Grid>
            </Grid>
        </div>
        <LandingFooter/>
        <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default GetStarted