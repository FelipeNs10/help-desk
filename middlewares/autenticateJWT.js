import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
    try {
        console.log(req.cookies)
        const token = req.cookies?.token

        if (!token) {
            return res.status(401).render("error",{ message: "Token ausente" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).render("error",{ message: "Token ausente" });
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

