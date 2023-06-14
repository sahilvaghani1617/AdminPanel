const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
    category : {
        type : String,
    }
});


const category = mongoose.model('category', CategorySchema);

module.exports = category;
