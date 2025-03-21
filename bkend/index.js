let express =  require("express")
let mongoose = require("mongoose")
let cors = require("cors")
const routes = require("./routee/rt")
let bodyParser = require("body-parser")

let app= express()
app.use(express.json())
app.use(bodyParser.urlencoded({"extended":true}))
app.use(cors())
app.use("/pimgs",express.static("./prodimgs"))
app.use("/",routes)


mongoose.connect("mongodb://127.0.0.1:27017/app").then(()=>{
    console.log("ok")

})

app.listen(5000)