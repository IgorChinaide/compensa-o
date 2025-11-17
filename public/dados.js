const API_URL = "http://localhost:3000/tarefas";

async function carregarDados() {
  try {
    const resposta = await fetch(API_URL);
    const tarefas = await resposta.json();

    const tbody = document.querySelector("#tabela-dados tbody");
    tbody.innerHTML = "";

    if (tarefas.length === 0) {
      // ❌ Aqui estava faltando crase (``) — o HTML precisa estar entre crases!
      tbody.innerHTML = `
        <tr><td colspan="5" style="text-align:center;">Nenhuma tarefa cadastrada 😅</td></tr>
      `;
      return;
    }

    tarefas.forEach(t => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${t.id}</td>
        <td>${t.titulo}</td>
        <td>${t.tipo || "—"}</td>
        <td>${t.data || "—"}</td>
        <td>${t.status}</td>
      `;
      tbody.appendChild(linha);
    });
  } catch (erro) {
    console.error("Erro ao carregar dados:", erro);
  }
}

// ✅ Corrigido o espaço estranho no final
window.onload = carregarDados;