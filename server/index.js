const express=require('express')
const cors=require('cors')
require('dotenv').config()
const mongoose=require('mongoose')
const app=express()
app.use(express.json()) 
app.use(cors({
  origin:"*"
}))
const userRoutes=require('./routes/user')
const adminRoutes=require('./routes/admin')
const fundraiserRoutes=require('./routes/fundraiser')
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

mongoose.connect(process.env.DATABASE,{ 
  useNewUrlParser:true,
  useUnifiedTopology:true,
  
}).then(()=>console.log("Successfully connected to mongoDB"))
.catch(err=>console.log(err))
app.use('/user',userRoutes)
app.use('/admin',adminRoutes)
app.use('/fundraiser',fundraiserRoutes)
const PORT=process.env.PORT||7000
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
