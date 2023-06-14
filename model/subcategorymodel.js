const mongoose = require('mongoose');


const SubcategorySchema = new mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
        require : true
    },
    subcategory : {
        type : String,
    }
});


const subcategory = mongoose.model('subcategory', SubcategorySchema);

module.exports = subcategory;
