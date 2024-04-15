import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, FormData } from '../model/database.js';

// handlers para a exibição so html
export function indexHandler(req, res) {
    res.render("index")
}
 
export function loginHandler(req, res) {
    res.render("login", { message: "" })
}

export function registerHandler(req, res) {
    res.render("register", { message: "" })
}

export function formHandler(req, res) {
    res.render("form", { message: "" })
}

export function notFoundHandler(req, res) {
    res.status(404).render("error", { message: "Página não encontrada" })
}

// controladores
export async function loginController(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).render("login", { message: "Usuário não encontrado." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).render("login", { message: "Senha incorreta." });
        }

        // Gera um token jwt e guarda em um cookie
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { maxAge: 1000 * 60 , secure: true, httpOnly: true, sameSite: "none" });

        res.status(201).redirect("/form")
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
            return res.status(400).render("register", { message: "Usuário ja existe." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hashedPassword
            });
            await user.save()

        res.status(201).redirect("/login")
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).render("register", { message: "Por favor, forneça informações válidas." });
        } else {
            console.error(error);
            return res.status(500).json({ message: "Erro no servidor" });
        }
    }
}
export async function formController(req, res) {
    const { name, email, number, dob, city, address, message } = req.body;

    try {
        const userId = req.user.id;

        // Criar uma nova entrada de formulário associada ao usuário
        const formData = new FormData({
            user: userId,
            name,
            email,
            number,
            dob,
            city,
            address,
            message
        });
        console.log(".")
        await formData.save();

        res.status(201).render("form", { message: "Formulário enviado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro no servidor" });
    }
}
