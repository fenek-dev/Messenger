const express  = require('express')
const config = require('config')
const mongoose = require('mongoose');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Chat = require('./models/Chat');
const User = require('./models/User');

require("dotenv").config();

const PORT = config.get('port') || 5000

app.use(express.json({type: 'text/plain'}))
app.use(express.json())
 
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/chats', require('./routes/chats.routes'))
async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        server.listen(PORT, ()=> console.log('Server is working on PORT ', PORT))
    } catch (error) {
        console.log('Error: ', error.message);
        process.exit(1)
    }
 
}

start()

io.on('connection', (socket) => {
    let id = socket.handshake.query.user_id;
    if(id) {
    User.findByIdAndUpdate(id,{"logs": {"online":true, "last_activity": new Date().getTime()}},(err)=>{
        if(err){
            console.log(err);
        }
    })
    }

    socket.on('list-of-chats', async({user_id})=> {

        if(user_id) {        
        const chats = await Chat.find({members: user_id})

        let data = []
        chats.forEach((chat)=> {
             new Promise(async(res, rej)=> {
                const user = await User.findOne({_id:chat.members.filter((name)=> name !== user_id)})
               
                res(user)
            }).then((user)=> {
                data.push({companion_name: user.name,companion_id: user._id, last_massage: chat.last_message || '', created_at: chat.created_at || ''})
            }).then(()=> {
                    socket.emit('get:list-of-chats', data) 
            })
        })

        Chat.watch([{ $match:{'fullDocument.members': user_id }}]).on('change', (data)=>{
           
            const updates = { 
                companion_id: data.fullDocument.members.filter((member)=>member !== user_id)[0],
                last_massage: data.fullDocument.last_message || '', 
                created_at: data.fullDocument.created_at || ''
            }
            socket.emit('get:list-of-chats', [updates])
        })
        }
    })
     
    socket.on('chat', async({members})=> {
        if(members) {        
        const chat = await Chat.findOne({members})
        const companion_id = members.find((user)=> user !== id)
        if(chat) {
            const messages = chat.messages 
            console.log(messages);
        socket.emit('get:chat', {companion_id,messages})
        }
        Chat.watch([{ $match:{'fullDocument.members': members }}]).on('change', (data)=>{
            const messages = data.fullDocument.messages
            socket.emit('get:chat', {companion_id,messages})
        })
        }
    })
    
    socket.on('disconnect', () => {
        if(id) {
            User.findByIdAndUpdate(id,{"logs": {"online":false, "last_activity": new Date().getTime()}}, (err)=>{
                if(err){
                    console.log(err);
                }
            })
            }
    })
});