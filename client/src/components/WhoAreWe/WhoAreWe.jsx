import { Grid, Typography } from '@mui/material'
import '../../styles/WhoAreWeStyles/WhoAreWe.scss'
import React from 'react'
import LandingNavbar from '../Landing/LandingComponents/LandingNavbar/LandingNavbar'
import Dheeraj from '../../assets/other/DheerajPic.png'
import Nikhil from '../../assets/other/NikhilPic.png'
import Mahesh from '../../assets/other/MaheshPic.png'
import Niraj from '../../assets/other/NirajPic.png'
import ReactLogo from '../../assets/logos/ReactLogo.png'
import ExpressLogo from '../../assets/logos/ExpressLogo.png'
import MongoLogo from '../../assets/logos/MongoLogo.png'
import FigmaLogo from '../../assets/logos/FigmaLogo.png'
import NodejsLogo from '../../assets/logos/NodeJsLogo.png'
import SolidityLogo from '../../assets/logos/SolidityLogo.png'
import CssLogo from '../../assets/logos/CssLogo.png'
import JavascriptLogo from '../../assets/logos/JavaScriptLogo.png'


import LandingFooter from '../Landing/LandingComponents/LandingFooter/LandingFooter'



function WhoAreWe() {
  return (
    <div><LandingNavbar/>
    <Typography className='AboutUsWhoAreWeText' align={'center'}>
          Who are <span className='AboutUsText'>we</span> ?
      </Typography>
      <Grid container className='AboutUsMainContainer' rowSpacing={8} columnSpacing={8} >
      
      <Grid item xs={10} sm={5} md={5} lg={6} xl={5} className="aboutUsGrids">
          <div className='AboutUsPrimaryBox'>
            <div className='AboutUsSecondaryBox'>
              <div className='AboutUsCrewPicDiv'>
                <img src={Dheeraj} alt="Dheeraj" className='AboutUsCrewPic' />
              </div>
              <div className='AboutUsLogoContainer'>
                
                  <div>
                    <img src={ReactLogo} alt='React' className='AboutUsLogoContainerPics'/>
                  </div>
                
                
                  <div>
                  <img src={ExpressLogo} alt='Express' className='AboutUsLogoContainerPics'/>
                  </div>
                
                
                  <div>
                    <img src={MongoLogo} alt='Mongo' className='AboutUsLogoContainerPics'/>
                  </div>
                
                
                  <div>
                  <img src={NodejsLogo} alt='Node' className='AboutUsLogoContainerPics'/>
                  </div>
                
                
                  <div>
                  <img src={SolidityLogo} alt='solidity' className='AboutUsLogoContainerPics'/>
                  </div>
                
                
                  <div>
                  <img src={FigmaLogo} alt='figma' className='AboutUsLogoContainerPics'/>
                  </div>
              
              
              </div>
              <Typography className='AboutUsName' align={'center'} variant="h5">
                  Dheeraj S
              </Typography>
              <Typography className='AboutUsDiscription' align ={'center'} >
                  Full Stack Developer
              </Typography>
            </div>
          </div>
      </Grid>

      <Grid item xs={10} sm={5} md={5} lg={6} xl={5} className="aboutUsGrids">
          <div className='AboutUsPrimaryBox'>
            <div className='AboutUsSecondaryBox'>
              <div className='AboutUsCrewPicDiv'>
                <img src={Nikhil} alt="Nikhil" className='AboutUsCrewPic'/>
              </div>
              <div className='AboutUsLogoContainer'>
                
                  <div>
                    <img src={ReactLogo} alt='React' className='AboutUsLogoContainerPics'/>
                  </div>
                
                
                  <div>
                  <img src={ExpressLogo} alt='Express' className='AboutUsLogoContainerPics'/>
                  </div>
                
                
                  <div>
                    <img src={CssLogo} alt='Css' className='AboutUsLogoContainerPics'/>
                  </div>
                
                
                  <div>
                  <img src={JavascriptLogo} alt='JavaScript' className='AboutUsLogoContainerPics'/>
                  </div>
                
                
              
              </div>
              <Typography className='AboutUsName' align={'center'} variant="h5">
                  Nikhil Rajput
              </Typography>
              <Typography className='AboutUsDiscription' align ={'center'}>
                  Frontend Developer
              </Typography>
            </div>
          </div>
      </Grid>


      <Grid item xs={10} sm={5} md={5} lg={6} xl={5} className="aboutUsGrids">
          <div className='AboutUsPrimaryBox'>
            <div className='AboutUsSecondaryBox'>
              <div className='AboutUsCrewPicDiv'>
                <img src={Niraj} alt="Niraj" className='AboutUsCrewPic'/>
              </div>
              <div className='AboutUsLogoContainer'>
                
                  <div>
                    <img src={ReactLogo} alt='React' className='AboutUsLogoContainerPics'/>
                  </div>
                

                
                  <div>
                  <img src={JavascriptLogo} alt='JavaScript' className='AboutUsLogoContainerPics'/>
                  </div>
                
                
                
                  <div>
                    <img src={CssLogo} alt='Css' className='AboutUsLogoContainerPics'/>
                  </div>
                
                
                
              
              </div>
              <Typography className='AboutUsName' align={'center'} variant="h5">
                  Niraj Joshi
              </Typography>
              <Typography className='AboutUsDiscription' align ={'center'}>
                  Content Lead
              </Typography>
            </div>
          </div>
      </Grid>


      <Grid item xs={10} sm={5} md={5} lg={6} xl={5} className="aboutUsGrids">
          <div className='AboutUsPrimaryBox'>
            <div className='AboutUsSecondaryBox'>
              <div className='AboutUsCrewPicDiv'>
                <img src={Mahesh} alt="Mahesh" className='AboutUsCrewPic'/>
              </div>
              <div className='AboutUsLogoContainer'>
                
                  <div>
                    <img src={ReactLogo} alt='React' className='AboutUsLogoContainerPics'/>
                  </div>
                

                
                  <div>
                  <img src={JavascriptLogo} alt='JavaScript' className='AboutUsLogoContainerPics'/>
                  </div>
                
                
                
                  <div>
                    <img src={CssLogo} alt='Css' className='AboutUsLogoContainerPics'/>
                  </div>
                
                
                
              
              </div>
              <Typography className='AboutUsName' align={'center'} variant="h5">
                  Mahesh B
              </Typography>
              <Typography className='AboutUsDiscription' align ={'center'}>
                  Frontend Developer
              </Typography>
            </div>
          </div>
      </Grid>

      

     </Grid>
     <div className="" style={{marginTop:"100px"}}>
      <LandingFooter/>
     </div>
      </div>

    
  )
}

export default WhoAreWe