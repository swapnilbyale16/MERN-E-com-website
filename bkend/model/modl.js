let mongoose=require("mongoose")
let us = new mongoose.Schema({
    _id:String,
    name:String,
    phno:String,
    pwd:String,
    role:{type:String, default:"user"}
})

let um = mongoose.model("users",us)

module.exports = um