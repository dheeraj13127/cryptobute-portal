require("dotenv").config();
const FundraiserSchema=require('../models/fundraiser')
const CbuteUser = require("../models/user");
exports.createNewFundraiser=async(req,res)=>{
  
    try{
        const newFundraiser = await FundraiserSchema.create(req.body);
        console.log(newFundraiser)
   
          console.log(req.body)
        return res.status(200).json({
        fundraiser: newFundraiser,
          message: "Success",
        });
    }
    catch(e){

    }
}
exports.updateUserFundsRaised=async(req,res)=>{
  try{
    const {walletAddress,fundId}=req.body
    await CbuteUser.findOneAndUpdate({walletAddress:walletAddress},{
          $push:{
            fundsRaised:fundId
          }
        },{upsert:true,returnDocument:true},(errs,reslt)=>{
          if(errs){
            return res.status(400).json(errs)
          }
          else{
              return res.status(200).json(reslt)
          }
        })

  }
  catch(e){

  }
}



exports.getFundraisers=async(req,res)=>{
  
  try{
      const getFundraiser = await FundraiserSchema.find();
     
      return res.status(200).json({
        fundraiser: getFundraiser,
        message: "Success",
      });
  }
  catch(e){

  }
}

exports.updateFundraiser=async(req,res)=>{
  try{
    const {mid,cid,walletAddress,amount,thash}=req.body
    const data={
      
      walletAddress:walletAddress,
      value:amount,
      thash:thash
    }
    await FundraiserSchema.findOneAndUpdate({_id:mid},{
      $push:{
        contributors:data,
      }
    },{upsert:true,returnDocument:true},(err,result)=>{
      if(err){
        return res.status(400).json(err)
      }
      else{
        
         CbuteUser.findOneAndUpdate({walletAddress:walletAddress},{
          $push:{
            fundsDonated:cid
          }
        },{upsert:true,returnDocument:true},(errs,reslt)=>{
          if(errs){
           
            return res.status(400).json(errs)
           
          }
          else{
              res.status(200).json(reslt)
          }
        })
      }
    })
  }
  catch(e){

  }
}

exports.updateSpendRequests=async(req,res)=>{
    try{
        await FundraiserSchema.findOneAndUpdate({_id:req.body.fid},{
          $push:{
            spendRequests:req.body
          }
        },{upsert:true,returnDocument:true},(err,result)=>{
          if(err){
            return res.status(400).json(err)
          }
          else{
            res.status(200).json(result)
          }
        })
    }
    catch(e){

    }
}

exports.rejectSpendRequest=async(req,res)=>{
  try{
      await CbuteUser.findOneAndUpdate({walletAddress:req.body.walletAddress},{
        $pull:{
          notifications:{spendId:req.body.spendId}
        }
      },(err,result)=>{
        if(err){
          return res.status(400).json(err)
        }
        else{
          return res.status(200).json(result)
        }
          
      })
  }
  catch(e){

  }
}
exports.spendAmount=async(req,res)=>{
  try{
      await FundraiserSchema.findOneAndUpdate({walletAddress:req.body.walletAddress},{
        $pull:{
          spendRequests:{spendId:req.body.spendId}
        }
      },(err,result)=>{
        if(err){
          return res.status(400).json(err)
        }
        else{
          return res.status(200).json(result)
        }
          
      })
  }
  catch(e){

  }
}