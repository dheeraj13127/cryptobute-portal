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
  Button,
  Badge


} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu'
import '../../../../styles/DashboardStyles/DashboardDrawer.scss'
import logo from '../../../../assets/logos/cbutelogo.png'
import merlin from '../../../../assets/logos/Merlin.jpeg'
import { useWeb3Modal } from '@web3modal/react'
import {useAccount,useDisconnect} from 'wagmi'
import NotificationsIcon from '@mui/icons-material/Notifications';
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
  const { open } = useWeb3Modal()
  const { isConnected } = useAccount()
  const {disconnect} = useDisconnect()
  const connectHandler = async () => {
    if (isConnected) {
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
          <div className="dashboardDrawerNotificationBox">
          <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBoxLogo">
            <div className="dashboardNavbarLogoBox">
              <img src={logo} alt="logo" className="dashboardDrawerLogo" />
            </div>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBox">
            <a href='/notifications' className={`navigatingLink dashboardDrawerListItem`}>
            <Badge badgeContent={0} color="error" className='dashboardDrawerNotificationBadge'>
                          <NotificationsIcon color="action" className='dashboardDrawerNotification' />
                        </Badge>
            </a>
          </ListItem>
          </div>
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
                        {isConnected ? "disconnect" : "connect wallet"}
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
            <a href='/myFundraisers' className={`navigatingLink dashboardDrawerListItem ${location.pathname==='/myFundraisers'&&"dashboardDrawerListItemActive"}`}>My Fundraisers</a>
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