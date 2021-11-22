const jwt = require("jsonwebtoken");
//const secret = "secret";
const fetchUser = async (req, res, next) => {
    //get the user from jwt token and add (id )to req object
    // const token = req.body.token;
    // console.log(token)
    // const token = req.headers;
    // console.log(token);
    const token = await req.headers.authorization.split(" ")[1];//we put header name 'auth-token and  remove bearer from header

    // console.log(token);
    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid user token1" })
    }
    try {
        const decode = await jwt.verify(token, 'secret')
        //find user data from token
        //console.log(decode)
        req.user = decode;
        //console.log(req.user)
        next();//after succesfull verify send req.user data
    }
    catch (error) {
        res.status(401).send({ error: "please authenticate using a valid user token 2" })
    }



}
module.exports = fetchUser;