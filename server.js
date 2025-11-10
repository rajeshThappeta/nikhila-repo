//create http server
import exp from 'express'
import {connect} from 'mongoose'
import { userRoute } from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app=exp()

//connecto database
const dbUrl='mongodb://localhost:27017/nikhiladb'
const port=8080
connect(dbUrl)
.then(()=>{
    console.log("DB connection success")
    //start http server
    app.listen(port,()=>console.log(`http server listening on port ${port}`))
})
.catch(err=>{
    console.log("Err in DB connection :",err)
})

//body parser middleware
app.use(exp.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
//use cookie parser middleware
app.use(cookieParser())
app.use("/user-api",userRoute)

//error handling middleware
app.use((err,req,res,next)=>{
    res.json({message:"Error",payload:err})
})
