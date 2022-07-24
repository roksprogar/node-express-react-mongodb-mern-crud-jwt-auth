const jwt = require("jsonwebtoken");
const { expressjwt: expjwt } = require("express-jwt");

exports.login = (req, res) => {
  const { name, password } = req.body;
  if (password === process.env.PASSWORD) {
    // Generate token and send to client/react.
    const token = jwt.sign({ name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({ token, name });
  } else {
    return res.status(400).json({
      error: "Incorrect password!",
    });
  }
};

// If the token is valid, the data (name) will be available in the body.user.name
exports.requireSignin = expjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
