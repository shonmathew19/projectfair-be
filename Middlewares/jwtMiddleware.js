const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log('Inside jwt middleware');
    if(!req.headers['authorization']){
        res.status(401).json('Authorization failed, please sign in again')
    }
    const token = req.headers['authorization'].split(' ')[1];
    console.log('token : ', token);
    try{
        const jwtResponse = jwt.verify(token,'userpwd123')
        console.log(jwtResponse);
        req.payload =jwtResponse.userId;
        next();
        
    }catch(err){
        console.log(err);
        res.status(401).json('Authorization failed, please sign in again')
    }
}
module.exports = jwtMiddleware;