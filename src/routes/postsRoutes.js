const router = require('../packages/exportPackages').express.Router()
const jwt = require('../packages/exportPackages').jwt
const postModel = require('../model/postModel')
const JWT_SECRET = require('../packages/exportPackages').JWT_SECRET

const authorization =async (req , res , next)=>{
    const token = req.headers["authorization"].split(' ')[1]
    if(!token){
        res.status(401).json({message: 'UnAuthorized'})
    }

    try{
        const decoded = jwt.verify(token , JWT_SECRET)
        req.id = decoded.id
        next()
    }
    catch(err){
        res.status(500).json({ message: 'Internal Server Error' });

    }
}


router.post('/posts' ,  authorization , async(req , res)=>{
    try{
        const postData = new postModel({
            title:req.body.title, 
            body:req.body.body,
            image:req.body.image
        })
        await postData.save()
        res.json('Posted Succesfully')
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})

router.put('/posts/:id' ,  authorization , async(req , res)=>{
   const id = req.params.id
   console.log(id);
    try{
        await postModel.findByIdAndUpdate(id,
            {
                title:req.body.title,
                body:req.body.body,
                image:req.body.image
                
            }
            )
            res.send({message:"Updated Successfully"})
    }
    catch(err){
        res.send({
            message:'my \erros'
        })
    }
})

router.delete('/posts/:id' , authorization , async(req , res)=>{
    const id = req.params.id
    try{
        await postModel.findByIdAndDelete(id)
        res.send({message:"Deleted Successfully"})
    }
    catch(err){
        res.send({
            message:err.message
        })
    }
})


module.exports = router