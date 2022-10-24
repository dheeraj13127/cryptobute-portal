import { Grid, Typography } from '@mui/material'
import React from 'react'
import '../../../../styles/DashboardStyles/FundraisersPool.scss'
function FundraisersPool() {
  return (
    <div className='fundraisersPoolContainer'>
        <Grid container>
            <Grid item xs={12} className="fundraisersPoolHeaderBox" >
            <Typography variant='h4' className='fundraisersPoolHeader'>Fundraisers Pool</Typography>
            <Typography variant='h6' className='fundraisersPoplInfo'>Try to help others at your best</Typography>
            </Grid>
        </Grid>
       
    </div>
  )
}

export default FundraisersPool