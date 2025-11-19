import express from "express";
import db from "../db.js";

const router = express.Router();

// Criar tarefa
router.post("/", (req, res) => {
  const { titulo, data, tipo, lembrete } = req.body;

  db.run(
    "INSERT INTO tasks (titulo, data, tipo, lembrete) VALUES (?,?,?,?)",
    [titulo, data, tipo, lembrete],
    function () {
      res.json({ id: this.lastID, message: "Tarefa criada" });
    }
  );
});

// Listar tarefas
router.get("/", (_, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    res.json(rows);
  });
});

// Atualizar tarefa
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, data, tipo, status, lembrete } = req.body;

  db.run(
    "UPDATE tasks SET titulo=?, data=?, tipo=?, status=?, lembrete=? WHERE id=?",
    [titulo, data, tipo, status, lembrete, id],
    () => res.json({ message: "Atualizado com sucesso" })
  );
});

// Deletar
router.delete("/:id", (req, res) => {
  db.run(
    "DELETE FROM tasks WHERE id=?",
    [req.params.id],
    () => {
      res.json({ message: "Tarefa removida" });
    }
  );
});

// Estatísticas
router.get("/estatisticas", (_, res) => {
  db.all(
    `
    SELECT
      (SELECT COUNT(*) FROM tasks) AS total,
      (SELECT COUNT(*) FROM tasks WHERE status='concluido') AS concluidas,
      (SELECT COUNT(*) FROM tasks WHERE status='pendente') AS pendentes
    `,
    [],
    (err, rows) => res.json(rows[0])
  );
});

export default router;
