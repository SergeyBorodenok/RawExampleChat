/**
 * Created by sergey on 04.07.2014.
 */
var HttpError=require('error').HttpError;
module.exports=function(req,res,next){
    if(!req.session.user){
        return next(new HttpError(401,"Вы не авторизованы"));
    }
    next();
}
