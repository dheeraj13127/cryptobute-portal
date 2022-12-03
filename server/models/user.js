const mongoose=require('mongoose')

const cbuteUserSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    accountVerified:{
        type:Boolean,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    profileImg:{
        type:String,
        required:true
    },
    panImg:{
        type:String,
        required:true
    },
    panNumber:{
        type:String,
        required:true
    },
    walletAddress:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    fundsRaised:{
        type:Array,
        required:true
    },
    fundsDonated:{
        type:Array,
        required:true
    },
    notifications:{
        type:Array,
        required:true
    }
},{timestamps:true}) 

module.exports=mongoose.model("CbuteUser",cbuteUserSchema)