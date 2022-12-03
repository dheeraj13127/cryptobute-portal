import React from 'react'
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar'
import '../../../../styles/DashboardStyles/NewFundraiser.scss'
import newFundraiserAsset from '../../../../assets/other/newFundAssets.png'
import { Grid } from '@mui/material'
import NewFundraiserForm from './NewFundraiserForm/NewFundraiserForm'
import { Toaster } from 'react-hot-toast'
function NewFundraiser() {
  return (
    <div>
      <DashboardNavbar/>
      <div className="newFundraiserContainer">
        <Grid container>
        <Grid item xs={12}>
        <div className="NewFundraiserAssetBox">
          <img src={newFundraiserAsset} alt="newFundraiserAsset" className='newFundraiserAsset'/>
        </div>
        </Grid>
          <NewFundraiserForm/>
        </Grid>
       
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default NewFundraiser