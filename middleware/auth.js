const jwt = require("jsonwebtoken")
const User = require("../model/user")


const auth = async (req, res, next) => {
    try {
        
        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // const user = await User.findOne({ _id: decoded._id })
        
        console.log("decoded",decoded)
        req.token = token
        req.user = decoded
        next()

    } catch (e) {
        res.status(401).send({ error: "Please authenticate." })
    }

}

module.exports = {
    auth: auth,
}