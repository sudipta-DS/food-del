import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.json({ success: false, message: "Not authorized." });
  try {
    const isValid = jwt.verify(token, "food-del");
    // console.log(isValid.id);
    req.body.userId = isValid.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export default authMiddleware;
