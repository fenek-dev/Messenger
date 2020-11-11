const { Schema, model } = require('mongoose')

const schema = new Schema({
    members: [{type:String}],
    last_message: {type: String},
    created_at: {type: String},
    messages: [
        {
            from: {type: String, required: true},
            body: String,
            created_at: {type: Number, required: true},
            received: Boolean

        }
    ]
})

module.exports = model('Chat', schema)