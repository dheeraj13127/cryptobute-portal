import { Button, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import '../../../../../../styles/DashboardStyles/FundraisersPoolTwo.scss'
import matic from '../../../../../../assets/logos/matic.png'
import { useSelector } from 'react-redux'
import ScaleLoader from 'react-spinners/ScaleLoader'

function FundraisersPoolTwo() {
  const allFundraisers = useSelector(state => state.blockchain.allFundraisers)

  return (
    <div className='fundraisersPoolTwoContainer'>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h6' className='fundraisersPoolOneHeader'>
            Pool Two
          </Typography>
        </Grid>
      </Grid>

      {allFundraisers&&allFundraisers.length!==0 ? (
        <div className='fundraisersPoolOneCardParentBox'>
          {allFundraisers.sort((a, b) => b._id - a._id).filter(x => x.totalFund <= 100).map((x, index) => (

            <div key={index} component={Card} className="fundraisersPoolOneCardParent">
              <CardActionArea className='fundraisersPoolOneCard'>
                <CardContent>
                  <div className="fundraisersPoolOneImgBox">
                    <img src={x.fundImage} loading="eager" alt="cartoon" className="fundraisersPoolOneImg" />

                  </div>

                  <div className="fundraisersPoolOneTitleBox">
                    <Typography
                      className='fundraisersPoolOneCardTitle'
                      gutterBottom
                      variant='h6'
                    >
                      {x.fundInfo}
                    </Typography> 
                    <div className="fundraisersPoolOneTotalFund">
                      {x.totalFund}
                      <img src={matic} alt="matic" className='maticLogo' />

                    </div>
                  </div>
                  <div className="fundraisersPoolOneCreatorInfoBox">
                    <div className="fundraisersPoolOneInfoImgBox">
                      <img src={x.userImg} alt="author-img" className="fundraisersPoolOneCreatorImg" />
                      <div className="latestImageCreatorInfo">
                        <Typography variant='body1' className='fundraisersPoolOneCreatorInfoCreator'>Fundraiser</Typography>
                        <Typography variant='h6' className='fundraisersPoolOneCreatorInfoCreatorName'>{x.userName}</Typography>
                      </div>
                    </div>
                    <div className="fundraisersPoolOneInfoTipBtnBox">
                      <a href={`/viewFundraiser/${x.contractAddress}/${x._id}`} className='navigatingLink'> <Button component="span" size='small' className='fundraisersPoolOneInfoTipBtn' >View</Button></a>
                    </div>


                  </div>
                  


                </CardContent>
              </CardActionArea>
            </div>


          ))
          }
        </div>

      ) : (
        <>
          <div className='healthBulletinLoaderBox'>
            <ScaleLoader color="#ffffff" loading={true} size={120} />
          </div>
        </>
      )}





    </div>
  )
}

export default FundraisersPoolTwo