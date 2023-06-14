const admin_model = require("../model/adminmodel")
const fs = require("fs")
const path = require("path")
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

//--------------------------------------------------- deshboard

function deshboard(req, res) {
  res.redirect("/");
}

//---------------------------------------------------- add_admin

function add_admin(req, res) {
  return res.render("add_admin")
}

//-------------------------------------------- mainpage

function adminpage(req, res) {
  res.render("deshboard")
}
//----------------------------------------------------- viewadmin

function view_admin(req, res) {
  admin_model.find({}, function (err, data) {
    if (err) {
      console.log("data not found");
    }
    return res.render("view_admin", {
      record: data
    })
  })
}
// ---------------------------------------------------- insertadmin

function insert_admin(req, res) {
  admin_model.uploadedAvatar(req, res, function (err) {

    var image_name = admin_model.avatarpath + "/" + req.file.filename
    var name = req.body.fname + " " + req.body.lname

    admin_model.create({
      name: name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      hobby: req.body.hobby,
      city: req.body.city,
      description: req.body.description,
      avatar: image_name
    })
  })
  return res.render("add_admin")
}

// -------------------------------------------------- delete_data

function delete_data(req, res) {

  admin_model.findById(req.params.id, function (err, record) {
    if (err) {
      console.log("record not found");
    }
    if (record.avatar) {
      fs.unlinkSync(path.join(__dirname, "..", record.avatar))
    }

    var phe = req.params.id;
    admin_model.findByIdAndDelete(phe, function (err, data) {
      if (err) {
        console.log("data not remove");
      }

    });
    return res.redirect("/view_admin");
  })
}

//--------------------------------------------------------------- view_profile

function view_profile(req, res) {

  admin_model.findById(req.params.id, function (err, data) {
    if (err) {
      console.log("data not define");
      return false
    }
    return res.render("view_profile", {
      "record": data
    })
  })

}

//------------------------------------------------ update_admin

function update_admin(req, res) {

  admin_model.findById(req.params.id, function (err, data) {
    if (err) {
      console.log("data not found");
      return false
    }
    return res.render("update_admin", {
      record: data
    })
  })
  console.log(req.params.id);

  console.log(req.params.id);
  console.log("hello");
}

//------------------------------------------------------- edit_admin

function edit_admin(req, res) {
  admin_model.uploadedAvatar(req, res, function (err) {
    if (err) {
      console.log("Something wrong");
      return false;
    }
    if (req.file) {
      admin_model.findById(req.body.editId, function (err, record) {
        if (err) {
          console.log("Something wrong");
          return false;
        }

        if (record.avatar) {
          fs.unlinkSync(path.join(__dirname, "..", record.avatar))
        }
        var image_name = admin_model.avatarpath + "/" + req.file.filename
        var name = req.body.fname + "" + req.body.lname

        admin_model.findByIdAndUpdate(req.body.editId, {
          name: name,
          email: req.body.email,
          password: req.body.password,
          gender: req.body.gender,
          hobby: req.body.hobby,
          city: req.body.city,
          description: req.body.description,
          avatar: image_name
        }, function (err, record) {
          if (err) {
            console.log("record not updated", err);
            return false;
          }
          return res.redirect("view_admin");
        })
      })
    }
    else {
      admin_model.findById(req.body.editId, function (err, record) {
        if (err) {
          console.log("Record not found");
          return false;
        }

        var imagePath = '';
        if (record.avatar) {
          imagePath = record.avatar;
        }

        admin_model.findByIdAndUpdate(req.body.editId, {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          city: req.body.city,
          gender: req.body.gender,
          hobby: req.body.hobby,
          avatar: imagePath
        }, function (err, record) {
          if (err) {
            console.log("record not updated", err);
            return false;
          }
          return res.redirect('view_admin');
        })
      })


    }
  })
}

//------------------------------------------------------ register_admin

function register_admin(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');       
  }
  return res.render("register_admin")
}

//--------------------------------------------------------- add_register

async function add_register(req, res) {
  console.log(req.body.email);
  const useremail = await admin_model.findOne({ email: req.body.email })
  if (useremail) {
    console.log("user already register !");
 
    return res.redirect("register_admin");

  }
  else if (req.body.password == req.body.conformpass) {
    admin_model.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })

    return res.redirect("login")
  }
  else {
    console.log("password and conform password do not match !");
   
    return res.redirect("register_admin")
  }
}

// --------------------------------------------login_admin

function login_admin(req, res) {
  if (req.cookies.id) {
    return res.redirect("/")
  }
  return res.render("login")
}

//--------------------------------------------- login_add

async function login_add(req, res) {

  try {
    const loginuser = await admin_model.findOne({ email: req.body.email })
    if (loginuser.email) {
      if (loginuser.password == req.body.password) {
        console.log("login succesfully");
        res.cookie('id', loginuser.id);
        res.cookie('record', loginuser);
        var token = jwt.sign({loginuser},"code")
        return res.redirect("/")
      } 
      else {
        console.log("incorect password !");
 
        return res.redirect("login");
      }
    }

  }
  catch (error) {
    console.log(error);
    console.log("email is not valid");

    return res.redirect("login");
  }


}

// ---------------------------------------------profile


async function profile(req, res) {
  res.render('profile');
}

//-------------------------------------- edit your profile


async function editprofile(req, res) {

  try {
    let data = await admin_model.find({});
    if (data) {
      return res.render('Editprofile', {
        'record': data
      });
    }
    else {
      console.log("record not found");
      return res.redirect('/');
    }
  }
  catch (err) {
    console.log(err);
    return res.redirect('/');
  }

}



//-------------------------------------------- editdataprofile
async function Editprofilepage(req, res) {

  admin_model.uploadedAvatar(req, res, function (err) {
    if (err) {
      console.log("Something wrong");
      return false;
    }
    if (req.file) {
      admin_model.findById(req.user, function (err, record) {
        if (err) {
          console.log("Something wrong");
          return false;
        }
        if (record.avatar) {
          fs.unlinkSync(path.join(__dirname, "..", record.avatar));
        }

        var imagePath = admin_model.avatarpath + "/" + req.file.filename
        req.body.avatar = imagePath;
        admin_model.findByIdAndUpdate(req.user,
          req.body,
          function (err, record) {
            if (err) {
              console.log("record not updated", err);
              return false;
            }
            return res.redirect('/profile');
          })
      })
    }
    else {
      admin_model.findById(req.user, function (err, record) {
        if (err) {
          console.log("Record not found");
          return false;
        }

        var imagePath = '';
        if (record.avatar) {
          imagePath = record.avatar;
        }
        req.body.avatar = imagePath;
        admin_model.findByIdAndUpdate(req.user,
          req.body,
          function (err, record) {
            if (err) {
              console.log("record not updated", err);
              return false;
            }
            return res.redirect('/profile');
          })
      })
    }
  })

}
   
//------------------------------------------- generateNewPass

async function generateNewPass(req, res) {
  return res.render('generatePass');
}

async function resetPassword(req, res) {
  try {
    const npass = req.body.npass;
    const cpass = req.body.cpass;

    if (npass == cpass) {
      let data = await admin_model.findOne({ email: req.cookies.email });

      if (data) {
        var updatepass = await admin_model.findByIdAndUpdate(data.id, {
          password: npass
        });
        if (updatepass) {

          req.flash('success', 'password change successfully..👌👍');
          res.cookie('otp', '');
          res.cookie('email', '');
          return res.redirect('/login');

        } else {

          req.flash('error', 'data not found..!!');
          return res.redirect('/generateNewPass');
        }
      } else {

        req.flash('error', 'data not found try another email..!!');
        return res.redirect('/generateNewPass');
      }
    }
    else {
      req.flash('error', 'new password & confirm password are not match..!!');
      return res.redirect('/generateNewPass');
    }

  } catch (error) {

    return res.redirect('/generateNewPass');
  }
}

//-------------------------------- chnagepassword

async function password(req, res) {
  res.render('password');
}

async function changepassword(req, res) {
  try {
    const password = req.user.password;
    const pass = req.body.pass;
    const npass = req.body.npass;
    const cpass = req.body.cpass;

    if (password == pass) {
      if (pass != npass) {
        if (npass == cpass) {

          const record = await admin_model.findByIdAndUpdate(req.user.id, {
            password: npass
          })
          return res.redirect('/logout');
        }
        else {
          console.log("new password & confirm password are not match..!!");
          res.redirect("back");
        }
      }
      else {
        console.log("old password & new password are match..!!");
        res.redirect("back");
      }
    }
    else {
      console.log("old password are not match..!!");
      res.redirect("back");
    }

  } catch (error) {
    console.log("error");
  }
}


//---------------------------------- lostpassword

async function lostpass(req, res) {
  res.render('lostpass');
}

async function lostpassword(req, res) {
  try {
    console.log("hello");
    const email = req.body.email;
    console.log(email,"=ghvhhgfyv=========================");
    const data = await admin_model.findOne({ email : email });
    console.log(data);
    if (data) {
      var otp = Math.floor(Math.random() * 10000);
      console.log(otp);
      var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5ea61199c7d412",
          pass: "99112cf7545f68"
        }
      });

      let info = await transporter.sendMail({
        from: 'bhanderisahil657@gmail.com', // sender address
        to: data.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>here is your otp :${otp}</b>`, // html body
      });

      res.cookie('otp', otp);
      res.cookie('email', req.body.email);

      return res.redirect('/checkOtp')

    }
    else{
      console.log("email not found");
      return res.redirect('/lostpass')
    }
  } catch (error) {
    console.log(error);
    return res.redirect('/lostpass')
  }
}

//------------------------------------------------- checkOtp


async function checkOtp(req, res) {
  return res.render('checkotp')
}

async function verifyOtp(req, res) {
  try {

    const otp = req.body.otp;
    const cookieotp = req.cookies.otp;
    if (cookieotp == otp) {
      return res.redirect('/generateNewPass');

    } else {
      req.flash('error', 'OTP are not match...');
      return res.redirect('/checkOtp');
    }

  } catch (error) {
    return res.redirect('/lostpass');
  }
}





module.exports = {
  deshboard,
  add_admin,
  view_admin,
  insert_admin,
  delete_data,
  update_admin,
  view_profile,
  edit_admin,
  register_admin,
  add_register,
  login_admin,
  login_add,
  profile,
  editprofile,
  Editprofilepage,
  adminpage,
  generateNewPass,
  password,
  changepassword,
  resetPassword,
  lostpass,
  lostpassword,
  checkOtp,
  verifyOtp
}