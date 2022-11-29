import Jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  !token && res.status(401).json("you are not authorized");
  Jwt.verify(token, process.env.JWT_SECERET_KEY, (err, user) => {
    !user && res.status(403).status("token is invalid");
    req.user = user;
    next();
  });
};
