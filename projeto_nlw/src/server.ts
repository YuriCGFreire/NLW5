import express from "express"; //Precisar instalar as tipagens também com o comando @types/express -D
//Outra informação importante. É preciso instalar também o typescript como dependencia de desenvolvimento
//Ele é utilizado apenas em ambientes de desenvolvimento (npm install typescript -D)
//E em seguida dar um (tsc --init) para criar um tsconfig.json
//Agora para que o node entenda as sintaxes que o node nao entende é preciso instaalr uma outra biblioteca
//npm install ts-node-dev -D (também como dependencia de senvolvimento), depois disso add o script no package.json
//{"dev": "ts-node-dev src/server.ts"}

const app = express();

app.get("/", (req, res) => {
    res.json({ msg: "Olá, Mundo!" })
})

app.post("/", (req, res) => {
    return res.json({ msg: "Usuário cadastrado com sucesso!" })
})

app.listen(3333, () => console.log("Server is running on port 3333"));