
const authorModel = require("../models/authorModel")


const createAuthor = async function (req, res) {

    try{
    let data = req.body
    if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email))) {
            return res.status(400).send({ status: false, message: "Email should be a valid email address" })
            }
    if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/).test(data.password)){
            return res.status(400).send({ status: false, message: "Password should be a combination of at least one lowercase letter, one uppercase letter, one numeric digit, and one special character" })
            }
    let savedData = await authorModel.create(data)
    res.status(201).send({status:true, data: savedData})
    }
    catch(err){
        res.status(500).send({msg:"Serverside Errors. Please try again later", error: err.message})

    }
}

module.exports.createAuthor = createAuthor
