var jwt=require('jsonwebtoken');
function verifyToken(req,res,next){
    let token=req.headers['authorization'];
    if(token){
        token=token.split(' ')[1];
        console.log(token);
        jwt.verify(token,"cvrcollege",(err,decoded)=>{
            if(err){
                return res.json({
                    success:false,
                    message:'Token is not valid'
                });
            }
            else{
                next();
            }
        })
    }
    else{
        return res.json({
            success:false,
            message:"A token is required for authorization"
        });
    }
}
module.exports=verifyToken