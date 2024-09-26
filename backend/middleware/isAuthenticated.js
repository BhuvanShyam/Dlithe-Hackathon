import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Get token from cookies
    if (!token) {
      return res.status(401).json({ message: "Please login first", success: false });
    }

    // Verify token and decode the payload
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    // Attach the userId to the req object
    req.id = decoded.userId; // Ensure the payload has `userId` and you're storing `userId` in the token

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error during authentication", success: false });
  }
};

export default isAuthenticated;
