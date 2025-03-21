let mongoose = require('mongoose')
let cs = mongoose.Schema({
    _id: String,
    uid: String,
    pid: String,
    name: String,
    qty: Number,
    price: Number,
    pimg: String
})

let cm = mongoose.model("cart",cs)

module.exports = cm

