import express from "express";
import cors from "cors";
import router from "./routes/tasks.js";

const app = express();

app.use(cors());
app.use(express.json());

// >>> servir arquivos da pasta PUBLIC
app.use(express.static("public"));

// rotas da API
app.use("/tarefas", router);

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});