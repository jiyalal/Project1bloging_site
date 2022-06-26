const authorModel = require("../models/authorModel")
const ObjectId = require('mongoose').Types.ObjectId



const blogCreateValidator = async function (req, res, next) {

    try{
        let body = req.body //capturing the data in body variable
        
        // check if every madatory field is enterd in the request/postman body
        if(!(("title" in body) && ("body" in body) && ("category" in body) && ("authorId" in body))){
            return res.status(400).send({ status: false, message: "Bad Request. All field is mandatory" })
        }

        // check if enterd title length is less than 4 character
        if((body.title.trim().length) < 4){
            return res.status(400).send({ status: false, msg: "Bad Request. Title must be atleast 4 character"})
        }

        // check if enterd body length is atleast 5 character
        if((body.body.trim().length) < 4){
            return res.status(400).send({ status: false, msg: "Bad Request. Body must have some words"})
        }

        // check if entered body, category and authorId is blank or empty
        if((body.category.trim().length == 0)|| (body.authorId.trim().length == 0)){
            return res.status(400).send({ status: false, msg: "Bad Request. All fields must have a valid entry"})
        }

        // check if tags named key is in request/postman body, and if present it should not be blank
        if(("tags" in body) && (body.tags.length == 0)){
            return res.status(400).send({ status: false, msg: "Bad Request. Tags cannot be empty"})
        }

        // check if sub category named key is in request/postman body, and if present it should not be blank
         if(("subcategory" in body) && (body.subcategory.length == 0)){
             return res.status(400).send({ status: false, msg: "Bad Request. Subgategory cannot be empty"})
        }

        // Objectid is a moongoose module/package that check if a enterd object id is valid or not.(Check the length)
        if(!ObjectId.isValid(body.authorId)){ // returns boolean. if not true than return invalid
            return res.status(400).send({ status: false, msg: "Bad Request. AuthorId invalid" })
        }

        // checks if the author id is resigterd in the DB
        searchAuthId = await authorModel.findById(body.authorId)
        if (!searchAuthId){ //if author id not found in DB, cannot create a blog
            return res.status(404).send({msg: "Resource Not found. Please create an account"})
        }

        next()
        } 
        
    catch(err){
        res.status(500).send({msg:"Serverside Errors. Please try again later", error: err.message})

    }
}



module.exports.blogCreateValidator = blogCreateValidator