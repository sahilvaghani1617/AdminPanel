const { default: mongoose } = require("mongoose");
const multer = require("multer");
const AVATAR_PATH = ("/upload/admin");
const path = require("path")

const adminscema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
    hobby: {
        type: Array
    },
    city: {
        type: String
    },
    description: {
        type: String
    },
    avatar: {
        type: String
    }

});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", AVATAR_PATH))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

adminscema.statics.uploadedAvatar = multer({ storage: storage }).single("avatar");
adminscema.statics.avatarpath = AVATAR_PATH;



const admin_model = mongoose.model("admindata", adminscema);

module.exports = admin_model