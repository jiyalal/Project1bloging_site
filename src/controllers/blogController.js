const blogModel= require("../models/blogModel")
const authorModel= require("../models/authorModel")
const moment = require('moment')


const createBlog= async function (req, res) {
    try{
    let enteredAuthorId = req.body.authorId
    searchAuthId = await authorModel.findById(enteredAuthorId)
    if (searchAuthId == undefined){
        res.status(404).send({msg: "Author is not registered. Please enter a valid authorId"})
    }else{
        let authorData= await blogModel.create(req.body)
        res.status(201).send({status:true, data: authorData})
    }
    }
    catch(err){
        res.status(500).send({msg:"Serverside Errors. Please try again later", error: err.message})

    }
}


const updateBlog = async function (req, res) {
    let enteredBlogId = req.params.blogId
    searchBlog = await blogModel.findById(enteredBlogId)
    if (!searchBlog){
        res.status(404).send({status:false, msg: "Please enter a valid blog Id"})
    }if(searchBlog.isDeleted== true){
        res.status(404).send({status:false, msg: "This blog has been deleted"})
    }
    if(searchBlog.isDeleted == false){
        let publishDate = moment().format('YYYY-MM-DD h:mm:ss')
        let updateData= await blogModel.findByIdAndUpdate(enteredBlogId, {title: req.body.title, body: req.body.body,
                             $addToSet: { tags: req.body.tags, subcategory: req.body.subcategory}, publishedAt: publishDate} ,{new: true})
        res.status(200).send({status:true, data: updateData})
    }

}


module.exports.createBlog = createBlog
module.exports.updateBlog = updateBlog