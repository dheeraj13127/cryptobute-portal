const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    applicationsReceived:{
        type:Array,
        required:true
    },
    applicationsApproved:{
        type:Array,
        required:true
    },
    applicationsRejected:{
        type:Array,
        required:true
    },
})
module.exports=mongoose.model("AdminSchema",adminSchema)