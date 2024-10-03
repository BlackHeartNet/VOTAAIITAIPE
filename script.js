let votos = {
    "TED E MARCELO": 0,
    "DÉ CARAJE E WAGNER": 0,
    "MARCONI E LUANDER": 0
};

// Verifica se o usuário já votou
if (localStorage.getItem('votoFeito')) {
    document.getElementById('aviso').innerHTML = '<p>Você já votou e não pode votar novamente.</p>';
    document.getElementById('votacao').style.display = 'none';
} else {
    document.getElementById('votacao').style.display = 'none';
}

// Carrega os resultados do Firestore
db.collection("votacoes").doc("resultados").get().then((doc) => {
    if (doc.exists) {
        votos = doc.data();
        atualizarResultados();
    } else {
        console.log("Nenhum resultado encontrado");
    }
});

// Função para votar
function vote(opcao) {
    if (localStorage.getItem('votoFeito')) {
        alert("Você já votou e não pode votar novamente.");
        return;
    }

    votos[opcao]++;
    localStorage.setItem('votoFeito', 'true'); // Marca que o usuário votou
    atualizarResultados();

    // Atualiza os resultados no Firestore
    db.collection("votacoes").doc("resultados").set(votos).then(() => {
        document.getElementById('aviso').innerHTML = '<p>Você já votou e não pode votar novamente.</p>';
        document.getElementById('votacao').style.display = 'none';
    }).catch((error) => {
        console.error("Erro ao atualizar resultados: ", error);
    });
}

// Atualiza os resultados na página
function atualizarResultados() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h3>Resultados:</h3>' +
        `<p>TED E MARCELO - ${votos["TED E MARCELO"]} votos</p>` +
        `<p>DÉ CARAJE E WAGNER - ${votos["DÉ CARAJE E WAGNER"]} votos</p>` +
        `<p>MARCONI E LUANDER - ${votos["MARCONI E LUANDER"]} votos</p>`;
}

// Função para exibir as opções de voto
function toggleVoteButton() {
    const checkbox = document.getElementById('termos');
    const avisoDiv = document.getElementById('aviso');
    const voteSection = document.getElementById('votacao');
    if (checkbox.checked) {
        avisoDiv.style.display = 'none'; // Remove o aviso
        voteSection.style.display = 'block';
    } else {
        avisoDiv.style.display = 'block'; // Exibe o aviso novamente
        voteSection.style.display = 'none';
    }
}
