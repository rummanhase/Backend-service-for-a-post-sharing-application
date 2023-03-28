const router = require('../packages/exportPackages').express.Router()


const userModel = require('../model/userModel')

const jwt = require('../packages/exportPackages').jwt
const bcrypt  =require('../packages/exportPackages').bcrypt
const JWT_SECRET = require('../packages/exportPackages').JWT_SECRET


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

router.post('/register' , async(req , res)=>{
    const {name ,email , password} = req.body
    console.log(name , email , password);
    let container = await userModel.find({email:email})
    if(container.length>0){
        res.status(300).json('User with this Email already present')
    }
    else{
        try{
            const hashedPass = await bcrypt.hash(password , 10)
            console.log(hashedPass);
            const new_user = await new userModel({
                name ,
                email ,
             password:hashedPass
            }).save() 
            console.log(new_user);
            res.status(201).json({
                message : 'User Created Successfully',
                user : {
                    name : name,
                    email : email,
                    password : hashedPass
                }
            })
       }
       catch(err){
           res.status(401).json({message : 'Error creating user'})
       }
    }
})



router.post('/login' , async (req , res)=>{
    const {email , password} = req.body
    console.log(email , password);
    if(!email || !password){
        res.status(401).json({ message: 'Missing email or/and Password' })
        return;
    }
    const user = await userModel.findOne({email : email})
    console.log(user);
    if(!user){
        res.status(401).json({message : 'Invalid User Please Register'})
    }
    const passMatch = await bcrypt.compare(password , user.password);
  
    
  console.log('req.body.password:', req.body.password);
  console.log('user.password:', user.password);
  console.log('passMatch:', passMatch);

    if(!passMatch){
        return res.status(401).json({
            message:'Oops Wrong Password'
        })
    }

    const token = jwt.sign({userId:user.id} , JWT_SECRET)

    res.status(201).json({
        message:'Successfully Login',
        token:token
    })

    
})
 




module.exports = router

// M -(A , O) - O --->O

// O -(M , A) - 

// A -(O , M) -  