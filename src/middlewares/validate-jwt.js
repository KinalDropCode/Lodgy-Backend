import jwt from 'jsonwebtoken'
import User from '../modules/user/user.model.js'

export const validateJWT = async (req, res, next) => {
    const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "You did not provide a token.",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(uid);
    if(!user){
      return res.status(401).json({
        msg: 'The user does not exist in the database.'
      })
    }
    if(!user.status){
      return res.status(401).json({
        msg: 'Invalid token [user is not active].'
      })
    }

    req.user = user;

    next();
  } catch (e) {
    console.log(e),
      res.status(401).json({
        msg: "Upss!!! Sorry, invalid token",e
      });
  }
}