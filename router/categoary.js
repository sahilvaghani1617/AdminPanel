const express = require("express");
const router = express.Router();
const categoary_modal = require("../model/categoarymodel");
const controller = require("../controller/categoarycontroller")


router.get('/insert_categoary',controller.insert);
router.post('/categoryinsert',controller.categoryinsert);
router.get('/view_categoary',controller.view);
router.get("/deleteRecord/:id",controller.delete_categoary);


module.exports = router

