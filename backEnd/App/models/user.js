const mongoose=require('mongoose')
const {Schema}=mongoose

const userSchema=new Schema({
    name:{
         type:String,
         required:true
    },
    phoneNumber:{
        type:Number,
        unique:true,
        required:true
       
    },
   password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'superAdmin'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const User=mongoose.model('User',userSchema)
module.exports=User
