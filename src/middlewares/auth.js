import jwt from 'jsonwebtoken';


/**
 * @param Request
 * @param Response
 * @param Next 
 * @return void|mixed|Response
 * Authentication Middleware. 
 * Protects Contact Resources by Authorization token
 */
const authMiddleware = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(401).json({
            status: "unauthorizeds",
            message: "unauthorized"
        })
    }

    const bearerHeader = req.headers.authorization;
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if(err)
            res.status(401).json({
                status: "unauthorized",
                message: "unauthorized"
            })
        req.user = data
    })
    
    next()
    
}

module.exports = authMiddleware;