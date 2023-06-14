const { default: mongoose } = require("mongoose");

const exteaScema = mongoose.Schema({
    categoryId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "category"
    },
    subcategoryid :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "subcategory"
    },
    extra : {
        type : String
    }
})

const extracategory  = mongoose.model("extracategory",exteaScema)

module.exports  = extracategory