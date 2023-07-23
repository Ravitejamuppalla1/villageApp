const Event=require('../models/event')
const Resident =require('../models/resident')

const eventsCltr={}


//list
eventsCltr.list = async (req, res) => {
    try {
        const {id} =  req.params
        const events = await Event.find({adminId:id})
       res.json(events)

    } catch (e) {
        res.json(e.message)
    }
}


//show 
eventsCltr.listOne = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Event.findById(id)
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    } catch (e) {
        res.json(e.message)
    }
}


//create
eventsCltr.create = async (req, res) => {
    try {
        const body = req.body
        const event = await Event.create(body)
        res.json(event)

    } catch (e) {
        res.json(e.message)
    }
}


//update 
eventsCltr.update = async (req, res) => {
    try {
        const id = req.params.id
        const body=req.body
        const data = await Event.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    }catch(e){
        res.json(e.message)
    }
}


//destroy
eventsCltr.destroy = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Event.findByIdAndDelete(id)
        if (data) {
            res.json(data)
        } else {
            res.json({})
        }
    }catch(e){
        res.json(e.message)
    }
}

//whatsapp

eventsCltr.sendMesaage = async(req,res)=>{
    try{
        const {body} = req
        const {id} =req.user
        console.log(data,id)
        const residentData = Resident.find({adminId:id})
      
        const accountSid = 'ACa604feb1c0b1d9eccf9d3b965d9b8373';
        const authToken = 'a081634e4f31afac0c843d2c043ab03c';
       const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        from: 'whatsapp:+12703722656',
        body: 'Your appointment is coming up on July 21 at 3PM',
        to: 'whatsapp:+918247898232'
    })
    .then(message => console.log(message))
    .catch(e=>console.log(e))
    .done();

    }
    catch(e){
        res.json(e)
    }
}

module.exports=eventsCltr