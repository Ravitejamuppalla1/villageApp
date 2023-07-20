const User = require('../models/user')
const Resident = require('../models/resident')
const village = require('../models/village')
const Product = require('../models/product')
const Event = require('../models/event')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Village = require('../models/village')
require('dotenv').config()
const userCtlr = {}

userCtlr.register = async (req, res) => {
    try {
        const { body } = req
        const newUser = await User.create(body)
        const saltValue = await bcryptjs.genSalt()
        const hashValue = await bcryptjs.hash(newUser.password, saltValue)
        newUser.password = hashValue
        const userData = await newUser.save()
        res.json(userData)
    }
    catch (e) {
        res.json(e)
    }
}

userCtlr.login = async (req, res) => {
    try {
        const { body } = req
         let userData
        userData = await User.findOne({ phoneNumber: body.phoneNumber }) || (userData = await Resident.findOne({ phoneNumber: body.phoneNumber }) )
        if (!userData) {
            res.json({
                errors: "Invalid phoneNumber or password"
            })
        }
        else {
            const verifyPassword = await bcryptjs.compare(body.password, userData.password)
            if (verifyPassword) {
                const tokenData = {
                    id: userData._id,
                    role: userData.role
                }
                const jwttoken = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })
                res.json({
                    token: `Bearer ${jwttoken}`
                })
            }
            else {
                res.json({
                    errors: "Invalid phoneNumber or password"
                })
            }

        }

    }
    catch (e) {

    }
}



//Getting users based on role "admin"


userCtlr.list = async (req, res) => {
    try {
        const adminData = await User.find({ role: 'admin' })
        if (adminData) {
            res.json(adminData)
        }
        else {
            res.json({
                errors: "No Admin Data Found"
            })
        }
    }
    catch (e) {
        res.json(e)
    }
}


userCtlr.listOne = async (req, res) => {
    try {
        const id = req.params.id
        const data = await User.findById(id)
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    } catch (e) {
        res.json(e.message)
    }
}
userCtlr.accountDetails = async (req, res) => {
    try {
        const id = req.user.id
        let data
         data = await User.findById(id) ||  (data = await Resident.findById(id))
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    } catch (e) {
        res.json(e.message)
    }
}
userCtlr.update = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const data = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    } catch (e) {
        res.json(e.message)
    }
}


userCtlr.delete = async (req, res) => {
    try {
        const id  = req.params.id
            const user = await User.findByIdAndDelete(id)
            const village = await Village.findOneAndDelete({ adminId: id })
            const resident = await Resident.deleteMany({ adminId: id })
           // const event = await Event.deleteMany({ villageId: body.id })
            //const product = await Product.deleteMany({ villageId: body.id })
            const result = await Promise.all([user, village, resident])
            res.json(result[0])
        
    }
    catch (e) {
        res.json(e)
    }
}

//deleting a admin

userCtlr.destroyAdmin = async(req,res)=>{

    try{
       const id  = req.params.id
       const type = req.query.type
       const {body} = req
       let updatedData
        if(type == 'soft'){
            updatedData = await User.findByIdAndUpdate(id,{isDeleted:true,phoneNumber:body.phoneNumber},{new:true,runValidators:true})
           } 
       else if(type == 'restore') {
           updatedData = await User.findByIdAndUpdate(id,{isDeleted:false,phoneNumber:body.phoneNumber},{new:true,runValidators:true})
          
          }
       res.json(updatedData)
            
    }
    catch(e){
         res.json(e)
    }
}

module.exports = userCtlr



