const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogControllers")
const authorValidator= require("../middleware/authorCreateValidation")
const blogValidator= require("../middleware/blogCreateValidation")
const login = require("../controllers/loginController")
const loginvalidation = require("../middleware/loginValidation")
const updateValidation = require("../middleware/updateValidation")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")





router.post("/createAuthor",authorValidator.authorCreateValidator ,authorController.createAuthor)

router.post("/createblog",authentication.authentication,blogValidator.blogCreateValidator,authorization.authCreateBlog ,blogController.createBlog)

router.get("/blogs",authentication.authentication, blogController.getBlogs)

router.put("/blogs/:blogId",authentication.authentication,authorization.authUpdateDelete,updateValidation.updatevalidation, blogController.updateBlog)

router.delete("/blogs/:blogId",authentication.authentication,authorization.authUpdateDelete, blogController.deleteBlogId)

router.delete("/blogs",authentication.authentication,authorization.authDeleteByParams, blogController.deleteBlogIdAndQuery)


//---------------Login---------

router.post("/loginUser" ,loginvalidation.loginvalidation ,  login.loginUser )


module.exports = router;