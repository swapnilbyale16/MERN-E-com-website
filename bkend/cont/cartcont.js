let { v4 } = require("uuid")
const cm = require("../model/cartmodel")

let addcart = async (req, res) => {
    try {
        let result = await cm.find({ uid: req.body.uid, pid: req.body.pid })
        if (result.length > 0) {
            await cm.findByIdAndUpdate({"_id":result[0]._id}, {$inc: {qty : 1}})
            res.json({"msg":"qty inc"})
        } else {
            let data = cm({ ...req.body, "_id": v4() })
            await data.save()
            res.json({ "msg": "product added to cart" })
        }
    } catch (err) {
        res.json({ "msg": "unable to add cart" })
    }
}

let getcart = async (req, res) => {
    try {
        let data = await cm.find({ "uid": req.params.uid })
        res.json(data)
    } catch (err) {
        res.json({ "msg": "unable to fetch the cart" })
    }
}

let inc = async (req, res) => {
    try {
        await cm.findByIdAndUpdate({ "_id": req.params.cid }, { $inc: { qty: 1 } })
        res.json({ "msg": "cart inc" })

    } catch (err) {
        res.json("err in cart inc")
    }
}

let dec = async (req, res) => {
    try {
        await cm.findByIdAndUpdate({ "_id": req.params.cid }, { $inc: { qty: -1 } })
        res.json({ "msg": "cart dec" })

    } catch (err) {
        res.json("err in cart dec")
    }
}

let delcart = async (req, res) => {
    try {
        await cm.findByIdAndDelete({ "_id": req.params.cid })
        res.json({ "msg": "cart deleted" })
    } catch (err) {
        res.json({ "msg": "unable to delete cart" })
    }
}

let countcart = async (req,res)=>{
    try{
        let count = await cm.countDocuments({uid: req.body.uid})
        res.json({"msg":count})
    }catch(err){
        res.json({"msg":"Unable to count cart items"})
    }
}


module.exports = { addcart, getcart, inc, dec, delcart, countcart }