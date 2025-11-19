import sqlite3 from "sqlite3";
sqlite3.verbose();

const db = new sqlite3.Database("./tarefas.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      data TEXT NOT NULL,
      tipo TEXT CHECK(tipo IN ('prova','trabalho','estudo')),
      status TEXT CHECK(status IN ('pendente','concluido')) DEFAULT 'pendente',
      lembrete TEXT
    )
  `);
});

export default db;