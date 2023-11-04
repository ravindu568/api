const UserSchema=require('../model/UserSchema');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const signup = async(req,resp)=>{

    UserSchema.findOne({username:req.body.username}).then(result=>{
        if(result==null){

            bcrypt.hash(req.body.password, 10, function(err, hash) {

                if(err){
                    return resp.status(500).json({message:'something went wrong'});
                }
                const user=new UserSchema({
                    username:req.body.username,
                    fullname:req.body.fullname,
                    password:hash
                });

                user.save().then(saveData=>{
                    resp.status(201).json({message:'user successfully signin'});
                }).catch(error=>{
                    resp.status(500).json({error});
                })

                
            });
        }else{
            resp.status(409).json({message:'email already exists'});
        }
    }).catch(error=>{
        resp.status(500).json(error);
    })

};

const login=async(req,resp)=>{

   UserSchema.findOne({username:req.body.username}).then(selectedUser=>{
    if(selectedUser==null){
        return resp.status(404).json({message:'userame not found'});
    }else{
        bcrypt.compare(req.body.password, selectedUser.password, function(err, result) {
            if(err){
                return resp.status(500).json(err);
            }
            if(result){
                // create a web token 
                const expiresIn=3600;
                const token=jwt.sign({'username':selectedUser.username},process.env.SECRET_KEY,{expiresIn});
                resp.setHeader('Authorization',`Bearer ${token}`);
                return resp.status(200).json({token:token});

            }else{
                return resp.status(401).json({message:'password is incorrect'});
            }
        });
    }
    
   }).catch(err=>{
    resp.status(500).json(err);
   })


};

module.exports={

    signup,login

}
