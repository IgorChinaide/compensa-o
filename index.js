const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname + '/'));

// Banco de dados em memória
let tarefas = [
  { id: 1, titulo: "Estudar JS", tipo: "estudo", data: "2025-11-12", status: "pendente" },
  { id: 2, titulo: "Fazer trabalho de matemática", tipo: "trabalho", data: "2025-11-14", status: "concluido" }
];

// Página inicial
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Página de dados
app.get('/dados', (req, res) => {
  res.sendFile(__dirname + '/dados.html');
});

// GET todas as tarefas
app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

// GET tarefa por ID
app.get('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada!" });
  }

  res.json(tarefa);
});

// POST criar tarefa
app.post('/tarefas', (req, res) => {
  const { titulo, tipo, data } = req.body;

  if (!titulo || !tipo || !data) {
    return res.status(400).json({ erro: "Preencha todos os campos!" });
  }

  const novaTarefa = {
    id: Date.now(),
    titulo,
    tipo,
    data,
    status: "pendente"
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// DELETE tarefa
app.delete('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);

  const existe = tarefas.some(t => t.id === id);
  if (!existe) {
    return res.status(404).json({ erro: "Tarefa não encontrada!" });
  }

  tarefas = tarefas.filter(t => t.id !== id);

  res.json({ mensagem: "Tarefa excluída com sucesso!" });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));