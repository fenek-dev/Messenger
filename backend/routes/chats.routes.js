const {Router} = require('express')
const Chat = require('../models/Chat');

require("dotenv").config();

const router = Router()

// /api/chats/create
router.post('/create', async(req, res)=> {

    try {
    const { members } = req.body  

    const candidate = await Chat.findOne({members})

    if(candidate) {
        return res.status(400).json({error: 'There is same chat'})
    }

    const chat = await new Chat({members, messages: []})
    await chat.save()

    res.status(201).json({members, messages: []})

    } catch (error) {

        res.status(500).json({error: error.message})
        
    }
    


})



module.exports = router