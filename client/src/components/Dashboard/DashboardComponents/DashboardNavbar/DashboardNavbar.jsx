import React from 'react'
import '../../../../styles/DashboardStyles/DashboardNavbar.scss'
import { Grid, AppBar, Button, Toolbar, Avatar, Chip, useTheme, useMediaQuery } from '@mui/material'
import logo from '../../../../assets/logos/cbutelogo.png'
import merlin from '../../../../assets/logos/Merlin.jpeg'
import { useConnectModal, useAccount, useDisconnect } from '@web3modal/react'

// import {useNavigate} from 'react-router-dom'
// import {useDispatch} from 'react-redux'
import { useLocation } from 'react-router-dom'
// import {userSignOut} from '../../../../redux/action/auth'
// import profileDefault from '../../../../assets/landing/tipogram-logo-2.png'


import DashboardDrawer from './DashboardDrawer'

function DashboardNavbar() {
  const location = useLocation()
  // const dispatch = useDispatch();
  // const navigate=useNavigate()

  // const handleUserSignOut=()=>{
  //     dispatch(userSignOut(navigate));
  // }
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { open } = useConnectModal()
  const { account } = useAccount()
  const disconnect = useDisconnect()
  const connectHandler = async () => {
    if (account.isConnected) {
      disconnect()
    }
    else {
      open()
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
                        location.pathname !== '/' && (
                          <a href='/' className='navigatingLink'><Button size="large" className="dashboardNavbarItems">
                            Dashboard
                          </Button></a>
                        )
                      }
                      <a href='/newFundraiser' className='navigatingLink'><Button size="large" className={`dashboardNavbarItems ${location.pathname==='/newFundraiser'&&"dashboardNavbarItemsActive"}`}>
                        New Fundraiser
                      </Button></a>
                      <a href='/dashboard/badges' className='navigatingLink'><Button size="large" className={`dashboardNavbarItems ${location.pathname==='/myFundraisers'&&"dashboardNavbarItemsActive"}`}>
                        My Fundraisers
                      </Button></a>
                      <a className='navigatingLink' href='/dashboard/myProfile'><Chip
                        avatar={<Avatar alt="Metamask" src={merlin} />}
                        label="Merlin"
                        variant="outlined"
                        className="dashboardNavbarChip"
                      /></a>
                      <Button onClick={connectHandler} size="large" className="dashboardNavbarItemsButton">
                        {account.isConnected ? "disconnect" : "connect wallet"}
                      </Button>
                      <a href='/signIn' className='navigatingLink'><Button size="large" className="dashboardNavbarItemsButton">
                        Sign out
                      </Button></a>
                        

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