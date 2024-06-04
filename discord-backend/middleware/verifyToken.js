import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    
    //Get token from request body or query parameters or headers
    let token = req.body.token || req.query.token || req.headers["authorization"];

    if(!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {

        token = token.replace(/^Bearer\s+/,"");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

    } catch(err) {
        return res.status(401).send("Invalid token");
    }

    return next();

};

export default verifyToken;