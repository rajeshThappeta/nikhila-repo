//create mini-express app
import exp from "express";
export const useRoute = exp.Router();
import { hash ,compare} from "bcryptjs";
import { UserModel } from "../models/UserModel.js";
import pkg from 'jsonwebtoken'
const {sign}=pkg;

//API routes

//Create User
useRoute.post("/user", async (req, res) => {
  //get new user from client
  let newUser = req.body;
  //hash the plain password
  let hashedPassword = await hash(newUser.password, 12);
  //replace plain password with hashed pasword
  newUser.password = hashedPassword;
  //crteate user doc
  let newUserDoc = new UserModel(newUser);
  //save user in db
  await newUserDoc.save();
  //send res
  res.json({ message: "New user created" });
});



//User authentication(login)- Submit credentials and get a token
useRoute.post("/user-login",async(req,res)=>{
    //get user credetials ob ject
    let userCred=req.body; //{ username,password}
    //find user by username
    let userObj=await UserModel.findOne({username:userCred.username})
    //if username not found
    if(userObj===null){
        res.json({message:"Invalid username"})
    }else{
        //compare passwords
        let status=await compare(userCred.password,userObj.password)
        //if passwords not matched
        if(status===false){
            res.json({message:"Invalid password"})
        }else{
            //create    a token
               let signedToken= sign({user:userObj},'abcdef',{expiresIn:20})
            //send res
            res.json({message:"user login success",token:signedToken,payload:userObj})
        }
    }

})   


