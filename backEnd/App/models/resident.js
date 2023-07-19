const mongoose=require('mongoose')
const {Schema}=mongoose

const residentSchema=new Schema({
    name:{
        type:String,
        required:true
    },
   phoneNumber:{
        type:Number,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    doorNo:{
        type:String,
        required:true,
        unique:true
    },
    villageId:{
        type:String,
        required:true
    },
    adminId:{
          type:Schema.Types.ObjectId,
          ref:'Users'
         
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const Resident=mongoose.model('Resident',residentSchema)
module.exports=Resident