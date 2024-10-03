let votos = {
    "TED E MARCELO": 0,
    "DÉ CARAJE E WAGNER": 0,
    "MARCONI E LUANDER": 0
};

function vote(opcao) {
    votos[opcao]++;
    atualizarResultados();
}

function atualizarResultados() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h3>Resultados:</h3>' +
        `<p>TED E MARCELO - ${votos["TED E MARCELO"]} votos</p>` +
        `<p>DÉ CARAJE E WAGNER - ${votos["DÉ CARAJE E WAGNER"]} votos</p>` +
        `<p>MARCONI E LUANDER - ${votos["MARCONI E LUANDER"]} votos</p>`;
}

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
