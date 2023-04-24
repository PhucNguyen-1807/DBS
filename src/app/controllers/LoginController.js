const { DEFAULT_ENCODING } = require('crypto');
const jwt = require('jsonwebtoken');
const path=require('path')
const accConnection = require("../../config/db/account.js");
const QUERY = require("../models/Query")
const cookieParser = require('cookie-parser');
class LoginController{
    render(req,res)
    {
        
            res.sendFile(path.join(__dirname,'../../resource/views/login/login.html'))
    }
    checkAndSendToken(req,res)
    {
        async function check ()
        {
            console.log('check');
            console.log(req.body.username);
            var result=await accConnection.query(QUERY.SELECT_LOGIN,Object.values(req.body))
            const check=result[0][0];
            console.log();
            if(check.Existing)
            {
               var token=  jwt.sign({user:req.body.username},'mk')
               res.cookie('token', token);
               res.sendFile(path.join(__dirname,'../../resource/views/login/sucessLogin.html'))

            }
            else{
                res.sendFile(path.join(__dirname,'../../resource/views/login/failLogin.html'))
            }
        }
        check()
    }
    checkToken(req,res,next)  {
        try{
            console.log('kiem tra');
            var ketqua=jwt.verify(req.cookies.token,'mk')
            console.log('finish');
            next();
        }
        catch(err){
            res.sendFile(path.join(__dirname,'../../resource/views/login/authenticationFail.html'))

        }
    }
    logout(req,res,next)
    {
        console.log('im deleting');
        res.clearCookie('token');
        res.redirect('/')
    }
}

module.exports=new LoginController()