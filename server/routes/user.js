const express=require('express')
const router=express.Router()

const {signInWithEmail,signUpWithEmail,getAllUsers,getProfile,sendSpendNotifications}=require('../controls/user')

router.post('/signUp',signUpWithEmail)
router.post('/signIn',signInWithEmail)
router.post('/getProfile',getProfile)
router.get('/getAllUsers',getAllUsers)
router.put('/sendSpendNotifications/:userId',sendSpendNotifications)





module.exports=router 