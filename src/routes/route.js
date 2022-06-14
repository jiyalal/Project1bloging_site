const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const tokenAuth = require("../middlewares/tokenAuthentication")



router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

router.get("/users/:userId",tokenAuth.tokenAuthenticator, userController.getUserData)

router.put("/users/:userId",tokenAuth.tokenAuthenticator, userController.updateUser)

router.delete("/users/:userId",tokenAuth.tokenAuthenticator, userController.deleteUser);


module.exports = router;