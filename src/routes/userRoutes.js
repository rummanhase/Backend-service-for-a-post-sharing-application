const router = require('express').Router()

const userModel = require('../model/userModel')

router.get('/get' , async (req , res)=>{
    try{
        const users = await userModel.find()
        console.log(users);
        res.send(users)
    }
    catch(err){
        res.send(`error ${err}`)
    }
})




module.exports = router
