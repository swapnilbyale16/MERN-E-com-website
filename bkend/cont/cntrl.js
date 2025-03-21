const um = require("../model/modl")
let bcrypt = require("bcryptjs")
let jwt = require("jsonwebtoken")
const cm = require("../model/cartmodel")


let reg = async (req, res) => {
    try {

        const { _id, name, phno, pwd } = req.body;

        if (!_id || !pwd) {
            return res.status(400).json({ msg: "Email and Password are required" });
        }

        let existingUser = await um.findOne({ _id });

        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        let hashcode = await bcrypt.hash(pwd, 10);
        let newUser = new um({ _id, name, phno, pwd: hashcode });

        await newUser.save();
        res.status(201).json({ msg: "Registration successful" });

    } catch (err) {
        console.error("Error in registration:", err);
        res.status(500).json({ msg: "Error in registration", error: err.message });
    }
};





let login = async (req, res) => {
    try {
        let obj = await um.findById({ "_id": req.body._id })
        if (obj) {
            let f = await bcrypt.compare(req.body.pwd, obj.pwd)
            if (f) {
                let data = await cm.find({ "uid": obj._id })

                res.json({ "token": jwt.sign({ "_id": obj._id }, "ecom"), "_id": obj._id, "name": obj.name, "role": obj.role, "cartlength": data.length })
            } else {
                res.json({ "msg": "Check password" })
            }
        } else {
            res.json({ "msg": "Check your mail" })
        }
    } catch (err) {
        res.json({ "msg": "Error in login" })
    }
}

let islogin = async (req, res, next) => {
    try {
        jwt.verify(req.headers.authorization, "ecom")
        next()
    } catch (err) {
        res.json({ "msg": "Please login first" })
    }
}

let isadmin = async (req, res, next) => {
    try {
        let obj = await um.findById({ "_id": req.headers.uid })
        if (obj && obj.role == "admin") {
            next()
        }
        else {
            res.json({ "msg": "you are not admin" })
        }
    }
    catch (err) {
        res.json({ "msg": "error in authorization" })
    }
}

module.exports = { reg, login, islogin, isadmin }