let multer = require("multer")
let {v4}=require("uuid")
const pm = require("../model/prodmodel")
const cm = require("../model/cartmodel")
let fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './prodimgs')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })
  
  const upload = multer({ storage: storage })

let add = async(req,res)=>{
    try{
        let data = pm({...req.body, "pimg":req.file.filename,"_id":v4()})
        await data.save()
        res.json({"msg":"product added"})
    }catch(err){
        res.json({"msg":"error in adding prod"})
    }
}

let getprod = async(req,res)=>{
    try{
        let data = await pm.find()
        res.json(data)
    }catch(err){
        res.json({"msg":"error in getting product"})
    }
}

let edit = async(req,res)=>{
    try{
        await pm.findByIdAndUpdate({"_id":req.body._id},req.body)

        let data = {...req.body}
        delete data["_id"]
        delete data["desc"]

        await cm.updateMany({"pid":req.body._id},data)  

        res.json({"msg":"updation done"})
    }catch(err){
        res.json({"msg":"unable to edit the data"})
    }
}



let addcomm =async(req,res)=>{
    try{
        await pm.findByIdAndUpdate({"_id":req.body.pid},{$push: {comm:req.body}})
        let data = await pm.findById({"_id":req.body.pid})
        res.json(data)
    }catch(err){
        res.json({"msg":"err in adding comment",err})
}}


let delprod = async(req,res)=>{
    try{
        let obj=await pm.findByIdAndDelete({"_id":req.params.pid})

        fs.rm(`./prodimgs/${obj.pimg}`, () => {})
        await cm.deleteMany({"pid":req.params.pid})

        res.json({"msg":"product deleted"})
    }catch(err){
        res.json({"msg":"err to delete the product"})
    }
}

module.exports = { upload, add, getprod, edit, delprod, addcomm}