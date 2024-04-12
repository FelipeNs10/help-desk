import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../model/database.js';

// handlers para a exibição so html
export function indexHandler(req, res) {
    res.render("index")
}
 
export function loginHandler(req, res) {
    res.render("login", { errorMessage: "" })
}

export function registerHandler(req, res) {
    res.render("register", { errorMessage: "" })
}


export function notFoundHandler(req, res) {
    res.status(404).render("404")
}

// controladores

export async function loginController(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).render("login", { errorMessage: "Usuário não encontrado." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).render("login", { errorMessage: "Senha incorreta." });
        }

        // Gera um token jwt e guarda em um cookie
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { secure: true, httpOnly: true });

        // testando token
        console.log(token)

        res.status(201).render("autenticado")
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function registerController(req, res) {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).render("register", { errorMessage: "Usuário ja existe." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save()

        // TODO: redirecionar para a tela de depois do login
        res.status(201).redirect("/autenticado")
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}