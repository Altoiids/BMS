const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { username: user},
    process.env.JWTSECRETKEY
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  console.log(accessToken)
  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    
    const validToken = verify(accessToken, process.env.JWTSECRETKEY);
    console.log("check");
    
    if (validToken) {
      req.authenticated = true;
      console.log("done");
      return next();
    }
  } catch (err) {
    console.log("check check");
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };