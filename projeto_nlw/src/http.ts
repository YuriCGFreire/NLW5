import express from "express"; //Precisar instalar as tipagens também com o comando @types/express -D
//Outra informação importante. É preciso instalar também o typescript como dependencia de desenvolvimento
//Ele é utilizado apenas em ambientes de desenvolvimento (npm install typescript -D)
//E em seguida dar um (tsc --init) para criar um tsconfig.json
//Agora para que o node entenda as sintaxes que o node nao entende é preciso instalar uma outra biblioteca
//npm install ts-node-dev -D (também como dependencia de senvolvimento), depois disso add o script no package.json
//{"dev": "ts-node-dev src/server.ts"}

import { routes } from "./routes"
import { createServer } from "http"
import { Server, Socket} from "socket.io"
import path from "path"

import "./database"

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.get("/pages/client", (req, res) => {
    return res.render("html/client.html")
})

app.get("/pages/admin", (req, res) => {
    return res.render("html/admin.html")
})

const http = createServer(app) //Criando o protocolo http
const io = new Server(http) //Criando protocolo WS

io.on("connection", (socket: Socket) => {
    console.log("Se conectou!", socket.id)
})

app.use(express.json())

app.use(routes)

export{ http, io }