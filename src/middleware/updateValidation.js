
const updatevalidation = async function (req, res , next) {
    try{
        let body = req.body

        // check if title named key is in request/postman body, and if present it should not be blank
        if(("title" in body) && (body.title.trim().length == 0)){
            return res.status(400).send({status:false, msg: "Bad Request. Title cannot be empty"})
        }

        //check if enterd title length is less than 4 character. Else send an error
        if((body.title.trim().length) < 4){
            return res.status(400).send({ status: false, msg: "Bad Request. Title must be atleast 4 character"})
        }

         //check if body named key is in request/postman body, and if present it should not be blank
         if(("body" in body) && (body.body.trim().length == 0)){
             return res.status(400).send({ status: false, msg: "Bad Request. Body cannot be empty"})
        }

         // check if tags named key is in request/postman body, and if present it should not be blank
         if(("tags" in body) && (body.tags.length == 0)){
             return res.status(400).send({ status: false, msg: "Bad Request. Tags cannot be empty"})
        }

         // check if subcategory named key is in request/postman body, and if present it should not be blank
         if(("subcategory" in body) && (body.subcategory.length == 0)){
             return res.status(400).send({ status: false, msg: "Bad Request. Subgategory cannot be empty"})
        }

        next()
    }
    catch(err){
        res.status(500).send({msg:"Serverside Errors. Please try again later", error: err.message})
    }
    }

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

module.exports.updatevalidation = updatevalidation