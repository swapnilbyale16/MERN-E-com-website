let mongoose = require("mongoose")
let ps = mongoose.Schema({
    _id:String,
    name:String,
    cat:String,
    price:Number,
    desc:String,
    pimg:String,
    comm:[{"name":String,"text":String,"rt":Number}]
})

let pm = mongoose.model("product",ps)

module.exports = pm