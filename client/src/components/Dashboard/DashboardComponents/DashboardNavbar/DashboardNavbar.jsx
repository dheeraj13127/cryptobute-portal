import React from 'react'
import '../../../../styles/DashboardStyles/DashboardNavbar.scss'
import {Grid,AppBar,Button,Toolbar,Avatar,Chip,useTheme,useMediaQuery} from '@mui/material'
import logo from '../../../../assets/landing/tipogram-logo-3.png'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {userSignOut} from '../../../../redux/action/auth'
import profileDefault from '../../../../assets/landing/tipogram-logo-2.png'
import metamask from '../../../../assets/dashboard/metamask.png'
import DashboardDrawer from './DashboardDrawer'
function DashboardNavbar({userData,ethBalance,metamaskAccount,tipogramContract}) {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate=useNavigate()

    const handleUserSignOut=()=>{
        dispatch(userSignOut(navigate));
    }
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

   
    
  return (
    <div className="">
    <Grid container>
 
      <Grid item xs={12}>
        <AppBar position="static" className="dashboardNavbar">
          <Toolbar>
            {
                isMobile?(
                    <DashboardDrawer ethBalance={ethBalance} metamaskAccount={metamaskAccount} userData={userData}/>
                ):(
                    <>
        <div className="dashboardNavbarLogoBox">
              <img src={logo} alt="logo" className="dashboardNavbarLogo"/>
            </div>
            <div className="dashboardNavbarLarge">
           
            <a className='navigatingLink' href='/dashboard/myProfile'><Chip
                 avatar={<Avatar alt="Metamask" src={userData?userData.profileImage:profileDefault} />}
                 label={userData&&userData.userName}
                variant="outlined"
                className="dashboardNavbarChip"
                 /></a>
            <Chip
                 avatar={<Avatar alt="Metamask" src={metamask} />}
                 label={metamaskAccount?`${parseFloat(ethBalance).toFixed(3)} ETH`:"disconnected"}
                variant="outlined"
                className="dashboardNavbarChip"
                 />
                  {
                location.pathname!=='/dashboard'&&(
                    <a href='/dashboard'  className='navigatingLink'><Button size="large" className="dashboardNavbarItems">
                    Dashboard
                  </Button></a>
                )
            }
                 <a href='/dashboard/postImage'  className='navigatingLink'><Button size="large" className="dashboardNavbarItems">
                Post
              </Button></a>
              <a href='/dashboard/badges'  className='navigatingLink'><Button size="large" className="dashboardNavbarItems">
                Badges
              </Button></a>
              <a href='/signIn' onClick={()=>handleUserSignOut()}  className='navigatingLink'><Button size="large" className="dashboardNavbarItems">
                Sign Out
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