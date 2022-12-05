import React from 'react'
import '../../../../styles/DashboardStyles/DashboardNavbar.scss'
import { Grid, AppBar, Button, Toolbar, Avatar, Chip, useTheme, useMediaQuery, Badge, Tooltip } from '@mui/material'
import logo from '../../../../assets/logos/cbutelogo.png'
import merlin from '../../../../assets/logos/Merlin.jpeg'
import { useWeb3Modal } from '@web3modal/react'
import {useAccount,useDisconnect} from 'wagmi'
import {useDispatch, useSelector} from 'react-redux'

import {useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom'



import DashboardDrawer from './DashboardDrawer'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect } from 'react'
import { getUserProfile } from '../../../../redux/actions/auth'
function DashboardNavbar() {
  const location = useLocation()
  const dispatch = useDispatch();
  const navigate=useNavigate()

  // const handleUserSignOut=()=>{
  //     dispatch(userSignOut(navigate));
  // }
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { open } = useWeb3Modal()
  const { isConnected,address } = useAccount()
  const {disconnect} = useDisconnect()
  useEffect(()=>{
    dispatch(getUserProfile(address))
  },[])// eslint-disable-line react-hooks/exhaustive-deps 
  const user=useSelector(state=>state.auth.userData)

  const connectHandler = async () => {
    if (isConnected) {
      disconnect()
      sessionStorage.removeItem("userId")
      navigate("/getStarted")
    }
    
  }
 

  return (
    <div className="">
      <Grid container>

        <Grid item xs={12}>
          <AppBar position="static" className="dashboardNavbar">
            <Toolbar>
              {
                isMobile ? (
                  <DashboardDrawer />
                ) : (
                  <>
                    <div className="dashboardNavbarLogoBox">
                      <img src={logo} alt="logo" className="dashboardNavbarLogo" />
                    </div>
                    <div className="dashboardNavbarLarge">

                      {
                        location.pathname !== '/dashboard' && (
                          <a href='/dashboard' className='navigatingLink'><Button size="large" className="dashboardNavbarItems">
                            Dashboard
                          </Button></a>
                        )
                      }
                      <a href='/dashboard/newFundraiser' className='navigatingLink'><Button size="large" className={`dashboardNavbarItems ${location.pathname === '/dashboard/newFundraiser' && "dashboardNavbarItemsActive"}`}>
                        New Fundraiser
                      </Button></a>
                      <a href='/dashboard/myFundraisers' className='navigatingLink'><Button size="large" className={`dashboardNavbarItems ${location.pathname === '/dashboard/myFundraisers' && "dashboardNavbarItemsActive"}`}>
                        My Fundraisers
                      </Button></a>
                      <a className='navigatingLink' href='/dashboard'>
                        <Tooltip title={user&&user.walletAddress}>
                        <Chip
                        avatar={<Avatar alt="Metamask" src={user&&user.profileImg} />}
                        label={`${user&&user.walletAddress.substring(0,7)+"..."}`}
                        variant="outlined"
                        className="dashboardNavbarChip"
                        sz
                      />
                        </Tooltip>
                       </a>
                      <a className='navigatingLink' href='/dashboard/notifications'>
                        <Badge badgeContent={1} color="error">
                          <NotificationsIcon color="action" className='dashboardNavbarNotification' />
                        </Badge>
                      </a>
                      <Button onClick={connectHandler} size="large" className="dashboardNavbarItemsButton">
                        {isConnected ? "disconnect" : "connect wallet"}
                      </Button>
                    


                    </div>
                  </>
                )
              }

            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </div>
  )
}

export default DashboardNavbar