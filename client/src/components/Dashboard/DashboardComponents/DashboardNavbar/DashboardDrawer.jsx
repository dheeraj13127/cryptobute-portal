import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Chip,
  Avatar,
  Button


} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu'
import '../../../../styles/DashboardStyles/DashboardDrawer.scss'
import logo from '../../../../assets/logos/cbutelogo.png'
import merlin from '../../../../assets/logos/Merlin.jpeg'
import { useConnectModal, useAccount, useDisconnect } from '@web3modal/react'
// import profileDefault from '../../../../assets/landing/tipogram-logo-2.png'
// import {useNavigate} from 'react-router-dom'
// import {useDispatch} from 'react-redux'
// import {userSignOut} from '../../../../redux/action/auth'
import { useLocation } from 'react-router-dom'
const drawerWidth = 240
function DrawerComponent({ userData, ethBalance, metamaskAccount }) {
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);
  //   const dispatch = useDispatch();
  //   const navigate=useNavigate()

  //   const handleUserSignOut=()=>{
  //       dispatch(userSignOut(navigate));
  //   }
  const { open } = useConnectModal()
  const { account } = useAccount()
  const disconnect = useDisconnect()
  const connectHandler = () => {
    if (account.isConnected) {
      disconnect()
    }
    else {
      open()
    }
  }
  return (
    <>
      <AppBar position="static" className="dashboardNavbar">
        <Toolbar>
          <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
            <MenuIcon className="dashboardNavbarMenuIcon" />
          </IconButton>

        </Toolbar>
      </AppBar>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#9D9D9D"
          }
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}

      >
        <List className="dashboardDrawerList">
          <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBoxLogo">
            <div className="dashboardNavbarLogoBox">
              <img src={logo} alt="logo" className="dashboardDrawerLogo" />
            </div>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} >

            <a href="/myProfile" className="navigatingLink dashboardDrawerListProfile">
              <Chip
                avatar={<Avatar alt="Metamask" src={merlin} />}
                label="Merlin"
                variant="outlined"
                className="dashboardDrawerChip"
              />
            </a>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBox" >

          <Button onClick={connectHandler} size="large" className="dashboardDrawerWallet">
                        {account.isConnected ? "disconnect" : "connect wallet"}
                      </Button>
          </ListItem>
          <div className="extraBorder"></div>

          {
            location.pathname !== '/' && (
              <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBox">
                <a href='/' className='navigatingLink dashboardDrawerListItem'>Dashboard</a>
              </ListItem>
            )
          }
          <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBox">
            <a href='/newFundraiser' className={`navigatingLink dashboardDrawerListItem ${location.pathname==='/newFundraiser'&&"dashboardDrawerListItemActive"}`}>New Fundraiser</a>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBox">
            <a href='/dashboard/badges' className={`navigatingLink dashboardDrawerListItem ${location.pathname==='/myFundraisers'&&"dashboardDrawerListItemActive"}`}>My Fundraisers</a>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBox">
            <ListItemText>
              <Link to="/signin" className="navigatingLink dashboardDrawerListItem">Sign Out</Link>
            </ListItemText>
          </ListItem>

        </List>
      </Drawer>

    </>
  );
}
export default DrawerComponent;