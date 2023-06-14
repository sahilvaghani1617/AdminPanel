const { urlencoded } = require("express");
const passport = require('passport');

const express = require("express");
app = express();

var cookieParser = require('cookie-parser')

const path = require("path");

port = 8080;

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://bhanderisahil:sahil%40123@cluster0.vttnglj.mongodb.net/test",{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("coonection successful");
}).catch((err)=>{
    console.log("connection failed",err);
})

require("./midleware/passport-local")

const adminrouter = require("./router/adminrouter");
const categoary = require("./router/categoary");
const subcategory = require("./router/subcategory");
const extracategory = require("./router/extracategory");
const session = require("express-session");
const flash = require('connect-flash');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static('asset'))

app.use("/upload",express.static(__dirname+"/upload"));
 
app.use(express.urlencoded());

app.use(cookieParser())


app.use(session({
    name : "adminId",
    secret : "back-end",
    resave : true,
    saveUninitialized : false,
    cookie : {
        maxAge : 1000*100*60
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setauthuser);


app.use(subcategory)
app.use(categoary)
app.use(adminrouter)
app.use(extracategory)
app.listen(port,(err)=>{
    if(!err){
        console.log("server is running port " +port);
    }
})
