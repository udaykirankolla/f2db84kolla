const mongoose = require("mongoose")
const doorSchema = mongoose.Schema({
Door_Name: String,
Door_company: String,
Door_size: Number
})
module.exports = mongoose.model("Door",
doorSchema)