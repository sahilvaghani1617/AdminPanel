const category = require("../model/categoarymodel");
const subcategoary = require("../model/subcategorymodel");
const extra = require("../model/extracategoarymodel");


async function insertExtra(req,res){
    const categorydata = await category.find({})    
    return res.render("add_extracatgory",{
        categorydata: categorydata,
    })
}

async function subdata (req,res){
  
    console.log(req.body.cateid);
    subcategoary.find({'categoryId' : req.body.cateid}, function(err,excdata){
        if(err){
            console.log(err);
        }
        return res.render('subdata',{
            categoryexid : excdata
        })
    })
}

async function extracategory(req,res){
    try {
        await extra.create(req.body);

        req.flash('success', 'record inserted successfully..!!');
        return res.redirect('/');

    } catch (error) {
        return res.redirect('/');
    }
}

async function view_extracatagory(req,res){
    const record = await extra.find({}).populate("categoryId").populate("subcategoryid").exec();
    console.log(record);
    return res.render("view_extra",{
        record : record,
    })
}



async function delete_categoary(req, res) {
 
    extra.findById(req.params.id, function (err, record) {
        if (err) {
            console.log("record not found");
        }
        var phe = req.params.id;
        extra.findByIdAndDelete(phe, function (err, data) {
            if (err) {
                console.log("data not remove");
            }

        });
        return res.redirect("back");
    })
}

module.exports = {
    insertExtra,
    subdata,
    extracategory,
    view_extracatagory,
    delete_categoary
}