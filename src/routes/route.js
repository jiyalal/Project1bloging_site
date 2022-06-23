const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")
const authorValidator= require("../middleware/authorvalidation")
const blogValidator= require("../middleware/blogvalidation")



router.post("/createAuthor",authorValidator.authorValidator ,authorController.createAuthor)

router.post("/createblog",blogValidator.blogValidator, blogController.createBlog)

router.get("/blogs", blogController.getBlogs)

router.put("/blogs/:blogId", blogController.updateBlog)

router.delete("/blogs/:blogId", blogController.deleteBlogId)

router.delete("/blogs", blogController.deleteBlogIdAndQuery)



module.exports = router;