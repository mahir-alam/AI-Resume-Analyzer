import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Not authorized. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized. Invalid token.",
    });
  }
};

export { protect };