const express=require('express')
const router=express.Router()

const {signInWithEmail,signUpWithEmail}=require('../controls/user')

router.post('/signUp',signUpWithEmail)
router.post('/signIn',signInWithEmail)





module.exports=router 