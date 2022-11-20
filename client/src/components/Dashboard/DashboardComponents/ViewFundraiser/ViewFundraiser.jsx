import React, { useState } from 'react'
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar'
import '../../../../styles/DashboardStyles/ViewFundraiser.scss'
import { useParams } from 'react-router-dom'
import { Grid, Typography, Tooltip, Button } from '@mui/material'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cryptobute from '../../../../blockchain/contractMaker/ContractMaker'
import { getFundraisers } from '../../../../redux/actions/blockchain'
import SavingsIcon from '@mui/icons-material/Savings';
import matic from '../../../../assets/logos/matic.png'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
function ViewFundraiser() {
    const allFundraisers = useSelector(state => state.blockchain.allFundraisers)
    const { id, mid } = useParams()
    const currentFundraiser = allFundraisers && allFundraisers.filter(x => x._id === mid)
    const dispatch = useDispatch()
    const [cbuteContract, setCbuteContract] = useState(null)
    const [collectedFund, setCollectedFund] = useState(1)
    const [contibuters, setContributers] = useState(0)
    useEffect(() => {

        fetchCamp()
        dispatch(getFundraisers())
    }, [])// eslint-disable-line react-hooks/exhaustive-deps 

    const fetchCamp = async () => {
        let cbute = Cryptobute(id)
        setCbuteContract(cbute)
        let collecFund = await cbute?.methods.collectedFund().call();
        setCollectedFund(collecFund)
        let contri = await cbute?.methods.approversCount().call();
        setContributers(contri)
    }


    return (
        <div>
            <DashboardNavbar />
            <div className="viewFundraiserContainer">
                <div>
                    {currentFundraiser ? (
                        <>
                            {
                                currentFundraiser.map((cf, key) => (
                                    <>
                                    <Grid container gap={2}  key={key} className="viewFundraiserContainerMainBox" >
                                        <Grid item xs={12} className="viewFundraiserContainerBox" >
                                            <div className="viewFundraiserPatientImgBox">
                                                <img src={cf.fundImage} alt="" className='viewFundraiserPatientImg' />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} className="viewFundraiserContainerBox" >
                                            <div className="viewFundraisersInfoBox">
                                                <Typography variant='h5' className='viewFundraiserTitle'><span className='viewFundraiserTitleSpan'>Fundraiser Title</span> : {cf.fundInfo}</Typography>
                                                <Typography variant='h6' className='viewFundraiserDesc'><span className='viewFundraiserDescSpan'>Fundraiser Description</span> : {cf.fundDescription}</Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={5} md={5} lg={2} className="viewFundraiserDetailsBox">
                                            <Tooltip title="Collected Fund">
                                                <SavingsIcon className='viewFundraiserCollectedFundIcon' />
                                            </Tooltip>
                                            &nbsp;
                                            {":"}&nbsp;
                                            <Button className='viewFundraiserCollectedFundInnerBox'>
                                                <Typography variant='body1' >{collectedFund}</Typography>
                                                <img src={matic} alt="matic" className='viewFundraiserMaticLogo' />
                                            </Button>

                                        </Grid>
                                        <Grid item xs={12} sm={5} md={5} lg={2} className="viewFundraiserDetailsBox">
                                        <Tooltip title="Requested Fund">
                                                <AccountBalanceIcon className='viewFundraiserTotalFundIcon' />
                                            </Tooltip>
                                            &nbsp;
                                            {":"}&nbsp;
                                            <Button className='viewFundraiserCollectedFundInnerBox'>
                                                <Typography variant='body1' >{cf.totalFund}</Typography>
                                                <img src={matic} alt="matic" className='viewFundraiserMaticLogo' />
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={5} md={5} lg={2} className="viewFundraiserDetailsBox">
                                        <Tooltip title="Minimum Contribution">
                                                <VolunteerActivismIcon className='viewFundraiserMinContIcon' />
                                            </Tooltip>
                                            &nbsp;
                                            {":"}&nbsp;
                                            <Button className='viewFundraiserCollectedFundInnerBox'>
                                                <Typography variant='body1' >{cf.minContribution}</Typography>
                                                <img src={matic} alt="matic" className='viewFundraiserMaticLogo' />
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={5} md={5} lg={2} className="viewFundraiserDetailsBox">
                                        <Tooltip title="Contributors">
                                                <Diversity3Icon className='viewFundraiserContributorIcon' />
                                            </Tooltip>
                                            &nbsp;
                                            {":"}&nbsp;
                                            <Button className='viewFundraiserCollectedFundInnerBox'>
                                                <Typography variant='body1' >{contibuters}</Typography>
                                               
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    </>
                                ))
                            }
                        </>
                    ) : (<></>)}

                </div>
            </div>
        </div>
    )
}

export default ViewFundraiser