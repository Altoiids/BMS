const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { username: user },
    process.env.JWTSECRETKEY
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  console.log(accessToken);
  if (!accessToken)
    return res.status(400).json({ error: "User not authenticated!" });

  try {
    const decodedToken = verify(accessToken, process.env.JWTSECRETKEY);
    const username = decodedToken.username; 
    req.username = username;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };