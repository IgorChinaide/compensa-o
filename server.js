const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let tarefas = []; // Aqui ficam as tarefas na memória

// Listar todas as tarefas
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// Adicionar nova tarefa
app.post("/tarefas", (req, res) => {
  const nova = { id: Date.now(), ...req.body };
  tarefas.push(nova);
  res.status(201).json(nova);
});

// Excluir tarefa
app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  tarefas = tarefas.filter(t => t.id !== id);
  res.status(200).json({ mensagem: "Tarefa excluída" });
});

app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:${port}');
});