const blogModel= require("../models/blogModel")
const authorModel= require("../models/authorModel")
const moment = require('moment')
const ObjectId = require('mongoose').Types.ObjectId



const createBlog= async function (req, res) {
    try{
        let body = req.body
        // let enteredAuthorId = body.authorId
        // let authorId = body.authorId
        // if(!(("title" in body) && ("body" in body) && ("category" in body) && ("authorId" in body))){
        //     return res.status(400).send({status: false, message: "All field is mandatory" })
        // }
        // if((body.title.length == 0) || (body.body.length == 0)|| (body.category.length == 0)|| (body.authorId.length == 0)){
        //     return res.status(400).send("This fields are required. Cannot be empty")
        // }
        // if(!ObjectId.isValid(authorId)){
        //      return res.status(400).send({ status: false, msg: "AuthorId invalid" })
        // }
        // searchAuthId = await authorModel.findById(enteredAuthorId)
        // if (!searchAuthId){
        //     return res.status(404).send({msg: "AuthorId not found"})
        // }else{
        body.isPublished = true
        let authorData= await blogModel.create(body)
        return res.status(201).send({status:true, data: authorData})
    }
    catch(err){
        return res.status(500).send({msg:"Serverside Errors. Please try again later", error: err.message})

    }
}





const getBlogs = async function (req, res) {
    try {
        let data = req.query
        let authorId = data.authorId
        if(("authorId" in data)&&(!ObjectId.isValid(authorId))){
            return res.status(400).send({ status: false, msg: "AuthorId invalid" })
        }
        data.isDeleted=false
        data.isPublished = true
        let savedBlogs = await blogModel.find(data).populate("authorId")

        if (savedBlogs.length==0){
            return res.status(404).send({ status: false, msg: "No data exist" })
        }else{
            return res.status(200).send({ status: true, data: savedBlogs })
        }
    }
    catch (err) {
        return res.status(500).send({ msg: "Serverside Errors. Please try again later", error: err.message })

    }

}







const updateBlog = async function (req, res) {
    try{
    let enteredBlogId = req.params.blogId
    if(!ObjectId.isValid(enteredBlogId)){
        return res.status(400).send({ status: false, msg: "BlogId invalid" })
        }
    let searchBlog = await blogModel.findById(enteredBlogId)

    if (!searchBlog){  
        return res.status(404).send({status:false, msg: "Blog not found"})
    }if(searchBlog.isDeleted== true){
        return res.status(404).send({status:false, msg: "This blog has been deleted"})
    }
    if(searchBlog.isDeleted == false){
        let publishDate = moment().format('YYYY-MM-DD h:mm:ss')
        let updateData= await blogModel.findByIdAndUpdate(enteredBlogId, {title: req.body.title, body: req.body.body,
                             $addToSet: { tags: req.body.tags, subcategory: req.body.subcategory},isPublished: true, publishedAt: publishDate} ,{new: true}).populate("authorId")
        return res.status(200).send({status:true, data: updateData})
    }
    }catch(err){
        return res.status(500).send({msg:"Serverside Errors. Please try again later", error: err.message})

    }
}







const deleteBlogId = async function(req,res){

    try{
        let enteredBlogId = req.params.blogId
        if(!ObjectId.isValid(enteredBlogId)){
        return res.status(400).send({ status: false, msg: "BlogId invalid" })
        }
        const validId= await blogModel.findById(blogId)
        if (!validId){  //check if document is present in DB
            return res.status(400).send({status:false,msg: "Blog Id is invalid"})
        }
        if(validId.isDeleted == true)  {  //check if the document is already deleted
            return res.status(404).send({status:false, msg: "Blog Document doesnot exist. Already deleted"})
        }
        if(validId.isDeleted== false){  //if item is not deleted or is present in DB
        let deleteDate = moment().format('YYYY-MM-DD h:mm:ss')
        await blogModel.findOneAndUpdate({_id : blogId},{isDeleted : true, deletedAt :deleteDate },
         {new : true})
         return res.status(201).send({status:true, msg: "Blog successfully deleted"})
        }

    }
    catch(err){
        console.log(err)
        return res.status(500).send({status:false, msg:err.message})
    }
}





const deleteBlogIdAndQuery = async function(req,res){

    try{
        let data = req.query
        let authorId = data.authorId
        if(("authorId" in data)&&(!ObjectId.isValid(authorId))){
            return res.status(400).send({ status: false, msg: "AuthorId invalid" })
        }
        if(Object.keys(data).length === 0){   //checking if entered filter is empty. If empty
            return res.status(400).send({status:false, msg:'Bad Request. Please enter valid condition'})
        }
        else{
        let updateData = await blogModel.updateMany(data, {$set: {isDeleted : true}})
        // console.log(updateData)
        if(updateData.matchedCount==0){  //if combination of filtered documents doesnot exist
            return res.status(404).send({status:false, msg: "Blog Document doesnot exist for this filter"})
        }else{
            return res.status(201).send({status:true,msg: "Blog successfully deleted", data: updateData})
        }
    }

    }
    catch(err){
        console.log(err)
        return res.status(500).send({status:false, msg:err.message})
    }
}




module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlog = updateBlog
module.exports.deleteBlogId = deleteBlogId
module.exports.deleteBlogIdAndQuery = deleteBlogIdAndQuery