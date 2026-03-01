const adminAuth = (req, res, next) => {
    const token = req.headers['x-admin-token'];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Admin token missing"
        });
    }

    if (token !== process.env.ADMIN_SECRET_TOKEN) {
        return res.status(403).json({
            success: false,
            message: "Invalid admin token"
        });
    }

    next();
};

module.exports = adminAuth;