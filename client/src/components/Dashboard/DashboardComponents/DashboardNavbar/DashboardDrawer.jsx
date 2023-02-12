import React, { useEffect, useState } from "react";
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
  Badge,
  Tooltip


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
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import { useLocation } from 'react-router-dom'
import { getUserProfile } from "../../../../redux/actions/auth";
const drawerWidth = 240
function DrawerComponent({ userData, ethBalance, metamaskAccount }) {
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);
    const dispatch = useDispatch();
    const navigate=useNavigate()

  //   const handleUserSignOut=()=>{
  //       dispatch(userSignOut(navigate));
  //   }
  const { open } = useWeb3Modal()
  const { isConnected,address } = useAccount()
  const {disconnect} = useDisconnect()
  const connectHandler = async () => {
    if (isConnected) {
      disconnect()
      sessionStorage.removeItem("userId")
      navigate('/getStarted')
    }
  }
  useEffect(()=>{
    dispatch(getUserProfile(address))
  },[])// eslint-disable-line react-hooks/exhaustive-deps 
  const user=useSelector(state=>state.auth.userData)
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
            <a href='/dashboard/notifications' className={`navigatingLink dashboardDrawerListItem`}>
            <Badge badgeContent={0} color="error" className='dashboardDrawerNotificationBadge'>
                          <NotificationsIcon color="action" className='dashboardDrawerNotification' />
                        </Badge>
            </a>
          </ListItem>
          </div>
          <ListItem onClick={() => setOpenDrawer(false)} >

            <a href="/dashboard" className="navigatingLink dashboardDrawerListProfile">
            <Tooltip title={user?user.walletAddress:""}>
              <Chip
                avatar={<Avatar alt="Metamask" src={user&&user.profileImg} />}
                label={`${user&&user.walletAddress.substring(0,7)+"..."}`}
                variant="outlined"
                className="dashboardDrawerChip"
              />
              </Tooltip>
            </a>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBox" >

          <Button onClick={connectHandler} size="large" className="dashboardDrawerWallet">
                        {isConnected ? "disconnect" : "connect wallet"}
                      </Button>
          </ListItem>
          <div className="extraBorder"></div>

          {
            location.pathname !== '/dashboard' && (
              <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBox">
                <a href='/dashboard' className='navigatingLink dashboardDrawerListItem'>Dashboard</a>
              </ListItem>
            )
          }
          

          <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBox">
            <a href='/dashboard/newFundraiser' className={`navigatingLink dashboardDrawerListItem ${location.pathname==='/dashboard/newFundraiser'&&"dashboardDrawerListItemActive"}`}>New Fundraiser</a>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBox">
            <a href='/dashboard/myFundraisers' className={`navigatingLink dashboardDrawerListItem ${location.pathname==='/dashboard/myFundraisers'&&"dashboardDrawerListItemActive"}`}>My Fundraisers</a>
          </ListItem>
        

        </List>
      </Drawer>

    </>
  );
}
export default DrawerComponent;