const API_URL = "http://localhost:3000/tarefas";

// Carregar lista de tarefas
async function carregarTarefas() {
  try {
    const resposta = await fetch(API_URL);
    const tarefas = await resposta.json();

    const lista = document.getElementById("lista-tarefas");
    lista.innerHTML = "";

    if (tarefas.length === 0) {
      lista.innerHTML = "<li>Nenhuma tarefa cadastrada 😅</li>";
      return;
    }

    tarefas.forEach(t => {
      const item = document.createElement("li");
      item.innerHTML = `
        <strong>${t.titulo}</strong> - ${t.tipo} - ${t.data} <br>
        Status: <em>${t.status || "Pendente"}</em><br>
        <button onclick="alterarStatus(${t.id}, '${t.status || "Pendente"}')">✅ Concluir</button>
        <button onclick="excluirTarefa(${t.id})">🗑 Excluir</button>
      `;
      lista.appendChild(item);
    });
  } catch (erro) {
    console.error("Erro ao carregar tarefas:", erro);
  }
}

// Adicionar nova tarefa
document.getElementById("form-tarefa").addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const tipo = document.getElementById("tipo").value;
  const data = document.getElementById("data").value;

  if (!titulo || !tipo || !data) {
    alert("Preencha todos os campos!");
    return;
  }

  const novaTarefa = {
    titulo,
    tipo,
    data,
    status: "Pendente"
  };

  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novaTarefa)
  });

  if (resposta.ok) {
    alert("Tarefa adicionada com sucesso!");
    document.getElementById("form-tarefa").reset();
    carregarTarefas();
  } else {
    alert("Erro ao adicionar tarefa!");
  }
});

// Alterar status (Concluir / Reabrir)
async function alterarStatus(id, statusAtual) {
  const novoStatus = statusAtual === "Concluído" ? "Pendente" : "Concluído";

  const resposta = await fetch(${API_URL}/${id}, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: novoStatus })
  });

  if (resposta.ok) {
    carregarTarefas();
  } else {
    alert("Erro ao alterar status da tarefa!");
  }
}

// Excluir tarefa
async function excluirTarefa(id) {
  if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;

  const resposta = await fetch(${API_URL}/${id}, { method: "DELETE" });

  if (resposta.ok) {
    alert("Tarefa excluída!");
    carregarTarefas();
  } else {
    alert("Erro ao excluir tarefa!");
  }
}

// Iniciar carregamento
window.onload = carregarTarefas;