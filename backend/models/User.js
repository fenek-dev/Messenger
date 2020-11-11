const { Schema, model } = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    name: {type:String, required:true},
    logs: {
        online: {type: Boolean, required: true, default: false },
        last_activity: {type: Number}
    },
    status: {type: String},

})

module.exports = model('User', schema)