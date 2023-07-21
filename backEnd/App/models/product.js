const mongoose=require('mongoose')
const {Schema}=mongoose

const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        minlength:10,
        maxlength:10
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
         type:String
    },
    image:{
        type:String
    },
    userId:{
          type:Schema.Types.ObjectId,
          ref:'Users',
          
    },
    villageId:{
        type:Schema.Types.ObjectId,
        ref:'Villages',
        required:true
    }
})

const Product=mongoose.model('Product',productSchema)
module.exports=Product