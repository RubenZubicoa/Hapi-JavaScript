const { Schema, model } = require('mongoose');

const task = new Schema({
    name: {
        type: String,
        required:true
    },
    description: String
},{
    timestamps:true
})

module.exports = model('Task', task);