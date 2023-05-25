const express=require('express')
const router=express.Router()
const {createNewFundraiser, getFundraisers,updateFundraiser,updateUserFundsRaised,updateSpendRequests,rejectSpendRequest, spendAmount}=require('../controls/fundraiser')

router.post('/newFundraiser',createNewFundraiser)
router.get('/getFundraisers',getFundraisers)
router.put('/updateFundraiser',updateFundraiser)
router.put('/updateFundsRaised',updateUserFundsRaised)
router.put('/updateSpendRequests',updateSpendRequests)
router.put('/rejectSpendRequests',rejectSpendRequest)
router.post('/spendAmount',spendAmount)







module.exports=router 