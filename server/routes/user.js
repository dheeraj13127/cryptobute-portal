const express=require('express')
const router=express.Router()

const {getAllUsers,getProfile,sendSpendNotifications, getStarted}=require('../controls/user')

router.post('/getStarted',getStarted)
router.get('/getProfile',getProfile)
router.get('/getAllUsers',getAllUsers)
router.put('/sendSpendNotifications/:walletAddress',sendSpendNotifications)


module.exports=router 