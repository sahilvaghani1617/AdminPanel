const sub_model = require("../model/subcategorymodel")
const category = require("../model/categoarymodel")

async function insert (req, res) {
    // console.log("vaibhav");
    const cdata = await category.find({})
    res.render('subcategory_insert',{
        cdata : cdata
    });
}

async function subcategoryinsert (req,res) {
    try {
      
        await sub_model.create(req.body);

        req.flash('success', 'record inserted successfully..!!');
        return res.redirect('/');

    } catch (error) {
        return res.redirect('/');
    }
}



async function view_subcategoary(req,res){
    const record = await sub_model.find({}).populate("categoryId").exec();


    return res.render("view_subcategoary",{
        record: record
    })
}


async function delete_categoary(req, res) {
 
    sub_model.findById(req.params.id, function (err, record) {
        if (err) {
            console.log("record not found");
        }
        var phe = req.params.id;
        sub_model.findByIdAndDelete(phe, function (err, data) {
            if (err) {
                console.log("data not remove");
            }

        });
        return res.redirect("back");
    })
}

module.exports = {
    insert,
    subcategoryinsert,
    view_subcategoary,
    delete_categoary
}