const authorModel = require("../models/authorModel")


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



const authorCreateValidator = async function (req, res, next) {

    try{
    let data = req.body

    // Check all the mandatory fields are present in the request body.
    if(!(("fname" in data) && ("lname" in data) && ("title" in data) && ("email" in data) &&("password" in data))){
        return res.status(400).send({status: false, message: "Bad Request. All field is mandatory" })
        }

    // Checks the length of first name and last name.
    if((data.fname.trim().length < 3) || (data.lname.trim().length < 2)){
        return res.status(400).send({status: false, msg:"Bad Request. This field must have a valid entry"})
        }

    // Check if title is in correct enum
    if((data.title !== "Mr")&&(data.title !== "Mrs")&&(data.title !== "Miss")){
        return res.status(400).send({ status: false, message: "Bad Request. Title must only have 'Mr','Mrs' or 'Miss'" })
        }

    // Check the validation of email
    if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email))) {
        return res.status(400).send({ status: false, message: "Bad Request. Email should be a valid email address" })
        }

    // Check password validation
    if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,15}$/).test(data.password)){
        return res.status(400).send({ status: false, message: "Bad Request. Password should be a combination of at least one lowercase letter, one uppercase letter, one numeric digit, and one special character" })
        }

    // Check if the entered email is already present in the Database    
    let dbData= await authorModel.find({email: data.email})
    if(dbData.length!=0){  //check if any document is returned from DB call
        return res.status(400).send({status: false, msg: "Bad Request. This email already exist. Please enter another email"})
        }   


    next()
    
    } 
    catch(err){
        res.status(500).send({msg:"Serverside Errors. Please try again later", error: err.message})

    }
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



module.exports.authorCreateValidator = authorCreateValidator