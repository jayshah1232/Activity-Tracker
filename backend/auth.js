require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    let param = req.query.token;
    const token = param;
    // console.log(token);

    if (!token) {
        res.status(401).json({ msg: 'Unauthorized' });
    }
    else {
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

            req.user = decoded;
            console.log(req.user);
            console.log("auth passed");
            next();
        } catch(error) {
            console.log("auth failed");
            res.status(400).json({ msg: error });
        }
    }
}

module.exports = auth;