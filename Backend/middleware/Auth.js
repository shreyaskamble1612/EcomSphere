import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    console.log("Auth header:", authHeader); // Debug log
    
    if (!authHeader?.startsWith("Bearer ")) {
      console.log("No Bearer token found");
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      console.log("Token is empty");
      return res.status(401).json({ message: "Unauthorized - Invalid token format" });
    }

    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET); // Debug log
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debug log
    
    req.user = decoded; // This should contain { user: { id: userId } }
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    console.error("Full error:", err);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: "Token has expired. Please login again.", 
        expired: true 
      });
    }
    
    return res.status(401).json({ 
      message: "Invalid token", 
      error: err.message 
    });
  }
};

// Admin-only middleware
export const requireAdmin = async (req, res, next) => {
  try {
    // First check if user is authenticated
    requireAuth(req, res, () => {
      // Import User model here to avoid circular dependency
      import('../Models/User.js').then(({ default: User }) => {
        User.findById(req.user.user.id).then(user => {
          if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: "Admin access required" });
          }
          next();
        }).catch(err => {
          console.error(err);
          return res.status(500).json({ message: "Server error" });
        });
      });
    });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
