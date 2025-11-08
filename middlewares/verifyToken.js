import pkg from "jsonwebtoken";
const { verify } = pkg;

export const verifyToken = (req, res, next) => {
  //TOKEN VERIFICATION LOGIC

  //get token from req.cookies
  let token = req.cookies.token;
  console.log(token);
  //if token not avaialable
  if (!token) {
    res.json("Unauthorized request");
  } else {
    try {
      //verify the token with secret key
      let decodedToken = verify(token, "abcdef");
      console.log("docoded token is ", decodedToken);
      next();
    } catch (err) {
      res.json({ message: "Invalid token and plz relogin " });
    }
  }
};
