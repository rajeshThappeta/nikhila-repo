import {Schema,model} from 'mongoose'

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:[4,'min length of password is 4']
    },
    email:{
        type:String,
        required:true
    }

},{
    versionKey:false,
    timestamps:true,
    strict:"throw"
})

//create model
export const UserModel=model("user",userSchema)
