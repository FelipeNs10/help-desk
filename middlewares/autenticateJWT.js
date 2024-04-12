// Middleware de autenticação JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.user = decoded;
            next();
        });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

// Rota protegida pelo middleware de autenticação JWT
app.get("/dashboard", authenticateJWT, (req, res) => {
    res.render("dashboard");
});
