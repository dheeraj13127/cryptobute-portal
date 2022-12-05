const CbuteUser = require("../models/user");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.signUpWithEmail = async (req, res) => {
    try {
     
      CbuteUser.findOne({ email: req.body.email }).then((user) => {
        if (user) {
          return res.status(400).json({
            message: "Email address already exists",
          });
        }
      });
  
      var hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
  
      const newUser = await CbuteUser.create(req.body);
     
      return res.status(200).json({
        user: newUser,
        message: "Success",
      });
    } catch (e) {
    
    }
  };

  exports.getStarted = async (req, res) => {
    try {
  
      const isWallet = await CbuteUser.findOne({ walletAddress: req.body.walletAddress });
     
      if (isWallet) {
     
          return res.status(200).json({ user:isWallet, message: "Welcome back !" });
      }
      else{
       
        const newUser = await CbuteUser.create(req.body);
     
        return res.status(200).json({
          user: newUser,
          message: "Success",
        });
      }
     
      
    } catch (e) {
      console.log(e)
    }
  };

  exports.getProfile = async (req, res) => {
    const { walletAddress } = req.body;
   
    try {
      await CbuteUser.findOne({ walletAddress: walletAddress }).then((resp) =>
        res.status(200).json({ user: resp })
      );
    } catch (e) {
  
    }
  };
  
  
  exports.getAllUsers = async (req, res) => {
    try {
      await CbuteUser.find().then((resp) =>
        res.status(200).json({ users: resp })
      );
    } catch (e) {
      
    }
  }

  exports.sendSpendNotifications=async(req,res)=>{
    try{
      console.log(req.params.walletAddress)
       CbuteUser.findOneAndUpdate({walletAddress:req.params.walletAddress},{
        $push:{
          notifications:req.body
        }
      },{upsert:true,returnDocument:true},(err,result)=>{
        if(err){
          console.log("err")
          return res.status(400).json(err)
        }
        else{
          console.log("xxxx")
          res.status(200).json(result)
        }
      })
  }
    catch(e){

    }
  }