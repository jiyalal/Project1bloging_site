const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");



const createUser = async function (req, res) {
  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({
    msg: savedData
  });
};




const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({
    emailId: userName,
    password: password
  });
  if (!user) {
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });
  } else {
    let token = jwt.sign({
        userId: user._id.toString(),
        batch: "radon",
        organisation: "FunctionUp"
      },
      "functionup-radon-1"
    );
    res.setHeader("x-auth-token", token);
    res.send({
      status: true,
      token: token
    });
  }
};




const getUserData = async function (req, res) {
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails) {
    return res.send({
      status: false,
      msg: "No such user exists"
    })
  } else {
    res.send({
      status: true,
      data: userDetails
    })
  }
};




const updateUser = async function (req, res) {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send("No such user exists");
  } else {
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({
        _id: userId,
      },
      userData, {
        new: true
      }
    );
    res.send({
      status: updatedUser
    });
  }
};





const deleteUser = async function (req, res) {
  let userId = req.params.userId;

  await userModel.findByIdAndUpdate(userId, {
    isDeleted: 'true'
  });
  res.send({
    Message: "isDelete successfully updated"
  })
};





module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;