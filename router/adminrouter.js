const express = require("express");
const router = express.Router()
const controller = require("../controller/admincontroller")
const passport = require("passport");



//session Create
router.post("/createSession",passport.authenticate('local',{failureRedirect : 'login'}),controller.deshboard);

// mainpage
router.get('/',passport.checkauth,controller.adminpage);

// view_profile max profile
router.get("/view_profile/:id",passport.checkauth,controller.view_profile);


// add_admin // insertdata 
router.get("/add_admin",passport.checkauth,controller.add_admin);
router.post("/insertadmin",passport.checkauth,controller.insert_admin);

// view_admin
router.get("/view_admin",passport.checkauth,controller.view_admin);


// deletedata
router.get("/deletedata/:id",passport.checkauth,controller.delete_data);


// updatedata
router.get("/updatedata/:id",passport.checkauth,controller.update_admin);
router.post("/edit_admin",passport.checkauth,controller.edit_admin);


//profile
router.get('/profile',passport.checkauth,controller.profile);


// Editprofile
router.get('/Editprofile',passport.checkauth,controller.editprofile);
router.post('/Editprofilepage',passport.checkauth,controller.Editprofilepage);


//register admin
router.get("/register_admin",controller.register_admin);
router.post("/add_register",controller.add_register);

//login admin
router.get("/login",controller.login_admin);
router.post("/login_add",controller.login_add)

//logout admin
       


//changepass
router.get('/password',controller.password);
router.post('/chnagepassword',controller.changepassword);

//creat new password
router.get('/generateNewPass',controller.generateNewPass);
router.post('/resetPassword',controller.resetPassword);

//lostpassword
router.get('/lostpass',controller.lostpass);
router.post('/lostpassword',controller.lostpassword);

//checkotp
router.get('/checkOtp',controller.checkOtp);
router.post('/verifyOtp',controller.verifyOtp);





module.exports = router