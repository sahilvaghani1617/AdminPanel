const express = require("express");
const router = express.Router();
const controller = require("../controller/extracategoarycontroller")


router.get("/insert_extra",controller.insertExtra);
router.post("/subdata",controller.subdata);
router.post("/extracategoryinsert",controller.extracategory);
router.get("/view_extracatagory",controller.view_extracatagory);
router.get("/deleteextra/:id",controller.delete_categoary);



module.exports = router