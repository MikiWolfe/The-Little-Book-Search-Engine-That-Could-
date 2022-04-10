const jwt = require("jsonwebtoken");
// require("dotenv").config()
// set token secret and expiration date
const secret = "mysecretsshhhhh";

// const secret = process.env.JWT_SECRET

const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    console.log(token);
    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    console.log(payload);
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
