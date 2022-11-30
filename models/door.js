const mongoose = require("mongoose")
const doorSchema = mongoose.Schema({
Door_Name: {type: String,required: [true, 'Name of the Door cannot be empty']}, 
Door_company: {type: String,required: [true, 'Door company cannot be empty']}, 
Door_size: {type: Number,required: [true, 'door size cannot be empty']}
})
module.exports = mongoose.model("Door",
doorSchema)