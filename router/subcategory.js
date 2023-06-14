const express = require("express");
const router = express.Router();
const controller = require("../controller/subcategoarycontroller")



router.get('/insert',controller.insert);
router.post('/subcategoryinsert',controller.subcategoryinsert);
router.get('/view_subcategoary',controller.view_subcategoary);
router.get("/deletesub/:id",controller.delete_categoary);



module.exports = router
