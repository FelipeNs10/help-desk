import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './model/database.js';
import router from './routes/userRoutes.js';
import { notFoundHandler } from './controller/userController.js';

dotenv.config();

const app = express();
const port = 8080;

// config
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(router)

// 404
app.use(notFoundHandler)

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
    connectDB();
})
