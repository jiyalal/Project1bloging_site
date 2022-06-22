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



const getBlogs = async function (req, res) {
    try {
        let data = req.query
        data.isDeleted=false
        data.isPublished = true
        let savedBlogs = await blogModel.find(data).populate("authorId")
        res.status(200).send({ status: true, data: savedBlogs })
         
        if (!savedBlogs) res.status(404).send({ status: false, msg: "No data exist" })
    }
    catch (err) {
        res.status(500).send({ msg: "Serverside Errors. Please try again later", error: err.message })

    }

}





const updateBlog = async function (req, res) {
    try{
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
                             $addToSet: { tags: req.body.tags, subcategory: req.body.subcategory},isPublished: true, publishedAt: publishDate} ,{new: true}).populate("authorId")
        res.status(200).send({status:true, data: updateData})
    }
    }catch(err){
        res.status(500).send({msg:"Serverside Errors. Please try again later", error: err.message})

    }
}





const deleteBlogId = async function(req,res){

    try{
        const blogId =  req.params.blogId
        const validId= await blogModel.findById(blogId)
        if (!validId){
            return res.status(400).send({status:false,msg: "Blog Id is invalid"})
        }
        if(validId.isDeleted == true)  {
            res.status(404).send({status:false, msg: "Blog Document doesnot exist. Already deleted"})
        }
        if(validId.isDeleted== false){
        await blogModel.findOneAndUpdate({_id : blogId},{isDeleted : true, deleteAt :new Date()},
         {new : true})
         res.status(201).send({status:true, msg: "Blog successfully deleted"})
        }

    }
    catch(err){
        console.log(err)
        res.status(500).send({status:false, msg:err.message})
    }
}



const deleteBlogIdAndQuery = async function(req,res){

    try{
     
        let queries = req.query
        let updateData = await blogModel.updateMany(queries, {$set: {isDeleted : true}},{new: true}).populate("authorId")
        return res.status(201).send({status:true,msg: "Blog successfully deleted", data: updateData})

    }
    catch(err){
        console.log(err)
        res.status(500).send({status:false, msg:err.message})
    }
}


module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlog = updateBlog
module.exports.deleteBlogId = deleteBlogId
module.exports.deleteBlogIdAndQuery = deleteBlogIdAndQuery