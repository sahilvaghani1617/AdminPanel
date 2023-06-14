const category = require("../model/categoarymodel")



//--------------------------------- createcategoary page

async function insert(req, res) {
    // console.log("vaibhav");
    res.render('category_insert');
}

//----------------------------------------createcategoary

async function categoryinsert(req, res) {
    try {

        await category.create(req.body);
        return res.redirect('back');

    } catch (error) {
        req.flash('error', 'record not inserted..!!');
        return res.redirect('/');
    }
}

//-------------------------------------------- view Categoary

async function view(req, res) {
    try {
        let data = await category.find({});
        if (data) {
            return res.render('category_view', {
                category: data
            });
        }
        else {
            req.flash('error', 'record not inserted..!!');
            return res.redirect('/');
        }
    }
    catch (err) {
        req.flash('error', 'somthing wrong..!!');
        return res.redirect('/');
    }
}

//--------------------------------------- delete_categoary

async function delete_categoary(req, res) {
    category.findById(req.params.id, function (err, record) {
        if (err) {
            console.log("record not found");
        }
        var phe = req.params.id;
        category.findByIdAndDelete(phe, function (err, data) {
            if (err) {
                console.log("data not remove");
            }

        });
        return res.redirect("back");
    })
}



module.exports = {
    insert,
    categoryinsert,
    view,
    delete_categoary
}