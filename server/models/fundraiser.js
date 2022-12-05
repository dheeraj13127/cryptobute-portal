const mongoose=require('mongoose')

const fundraiserSchema=new mongoose.Schema({
    walletAddress:{
        type:String,
        required:true,
    },
    contractAddress:{
        type:String,
        required:true,
    },
    fundInfo:{
        type:String,
        required:true,
    },
    fundDescription:{
        type:String,
        required:true,
    },
    fundImage:{
        type:String,
        required:true,
    },
    fundProofs:{
        type:Array,
        required:true
    },
    totalFund:{
        type:Number,
        required:true
    },
    userImg:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    contributors:{
        type:Array,
        required:true
    },
    spendRequests:{
        type:Array,
        required:true
    }
   

    
},{timestamps:true})

module.exports=mongoose.model("FundraiserSchema",fundraiserSchema)