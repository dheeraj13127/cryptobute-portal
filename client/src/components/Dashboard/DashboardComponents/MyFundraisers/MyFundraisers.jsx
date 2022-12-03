import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar'
import '../../../../styles/DashboardStyles/MyFundraisers.scss'
import { Button, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'
import { Toaster } from 'react-hot-toast'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { getFundraisers } from '../../../../redux/actions/blockchain'
import matic from '../../../../assets/logos/matic.png'
function MyFundraisers() {
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getFundraisers())

    }, [])// eslint-disable-line react-hooks/exhaustive-deps 
    const allFundraisers = useSelector(state => state.blockchain.allFundraisers)
    const userId = sessionStorage.getItem("userId")
    const myFundraisers = allFundraisers && allFundraisers.filter(x => x.userId === userId)


    return (
        <div>
            <DashboardNavbar />
            <div className="myFundraiserContainer">

                {myFundraisers&&myFundraisers.length!==0  ? (
                    <div className="myFundraiserContainerMainBox">
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant='h6' className='myFundraisersHeader'>
                                  My Fundraisers
                                </Typography>
                            </Grid>
                        </Grid>
                        <div className='fundraisersPoolOneCardParentBox'>
                            {
                                myFundraisers.map((mf, key) => (
                                    <div key={key} component={Card} className="fundraisersPoolOneCardParent">
                                        <CardActionArea className='fundraisersPoolOneCard'>
                                            <CardContent>
                                                <div className="fundraisersPoolOneImgBox">
                                                    <img src={mf.fundImage} loading="eager" alt="cartoon" className="fundraisersPoolOneImg" />

                                                </div>

                                                <div className="fundraisersPoolOneTitleBox">
                                                    <Typography
                                                        className='fundraisersPoolOneCardTitle'
                                                        gutterBottom
                                                        variant='h6'
                                                    >
                                                        {mf.fundInfo}
                                                    </Typography>
                                                    <div className="fundraisersPoolOneTotalFund">
                                                        {mf.totalFund}
                                                        <img src={matic} alt="matic" className='maticLogo' />

                                                    </div>
                                                </div>
                                                <div className="fundraisersPoolOneCreatorInfoBox">
                                                    <div className="fundraisersPoolOneInfoImgBox">
                                                        <img src={mf.userImg} alt="author-img" className="fundraisersPoolOneCreatorImg" />
                                                        <div className="latestImageCreatorInfo">
                                                            <Typography variant='body1' className='fundraisersPoolOneCreatorInfoCreator'>Fundraiser</Typography>
                                                            <Typography variant='h6' className='fundraisersPoolOneCreatorInfoCreatorName'>{mf.userName}</Typography>
                                                        </div>
                                                    </div>
                                                    <div className="fundraisersPoolOneInfoTipBtnBox">
                                                        <a href={`/myFundraisers/${mf.contractAddress}/${mf._id}`} className='navigatingLink'> <Button component="span" size='small' className='fundraisersPoolOneInfoTipBtn' >View</Button></a>
                                                    </div>


                                                </div>



                                            </CardContent>
                                        </CardActionArea>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : (<>
                    <div className='viewFundraiserLoaderBox'>
                        <ScaleLoader color="#6C97A9" loading={true} size={120} />
                    </div>
                </>)}

            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    )
}

export default MyFundraisers