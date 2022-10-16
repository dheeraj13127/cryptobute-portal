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
 

} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu'
import '../../../../styles/DashboardStyles/DashboardDrawer.scss'
import logo from '../../../../assets/logos/cbutelogo.png'
import merlin from '../../../../assets/logos/Merlin.jpeg'
// import profileDefault from '../../../../assets/landing/tipogram-logo-2.png'
// import {useNavigate} from 'react-router-dom'
// import {useDispatch} from 'react-redux'
// import {userSignOut} from '../../../../redux/action/auth'
// import metamask from '../../../../assets/dashboard/metamask.png'
import {useLocation} from 'react-router-dom'
const drawerWidth=240
function DrawerComponent({userData,ethBalance,metamaskAccount}) {
  const location = useLocation();  
  const [openDrawer, setOpenDrawer] = useState(false);
//   const dispatch = useDispatch();
//   const navigate=useNavigate()

//   const handleUserSignOut=()=>{
//       dispatch(userSignOut(navigate));
//   }
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
        <ListItem onClick={() => setOpenDrawer(false)}>
        <div className="dashboardNavbarLogoBox">
              <img src={logo} alt="logo" className="dashboardDrawerLogo"/>
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
          {/* <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBox">
          <Chip
                 avatar={<Avatar alt="Metamask" src={metamask} />}
                 label={metamaskAccount?`${parseFloat(ethBalance).toFixed(3)} ETH`:"disconnected"}
                variant="outlined"
                className="dashboardDrawerChip"
                 />
          </ListItem> */}
          {
                location.pathname!=='/'&&(
            <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBox">
             <a href='/'  className='navigatingLink dashboardDrawerListItem'>Dashboard</a>
          </ListItem>
                )
            }
             <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBox">
             <a href='/dashboard/postImage'  className='navigatingLink dashboardDrawerListItem'>New Fundraiser</a>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} className="dashboardDrawerListItemBox">
             <a href='/dashboard/badges'  className='navigatingLink dashboardDrawerListItem'>My Fundraisers</a>
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