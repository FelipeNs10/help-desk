import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './module/database.js';
dotenv.config();

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

app.get("/teste", (req, res) => { 
    res.render("index")
})

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
    connectDB();
})