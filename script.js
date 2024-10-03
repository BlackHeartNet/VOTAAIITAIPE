const SHEET_ID = 'VOTAAIITAIPE'; // ID da sua planilha
const API_KEY = 'AizaSyDiSP_HxYxJmq6LaxIDm4y00B813R13mHE'; // Sua chave da API
const VOTING_RANGE = 'VOTAAIITAIPÉ!A:B'; // Intervalo de dados (candidatos e votos)

let votos = {
    "TED E MARCELO": 0,
    "DÉ CARAJE E WAGNER": 0,
    "MARCONI E LUANDER": 0
};

async function fetchVotes() {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${VOTING_RANGE}?key=${API_KEY}`);
    const data = await response.json();
    data.values.forEach(row => {
        if (votos[row[0]] !== undefined) {
            votos[row[0]] = parseInt(row[1]) || 0; // Atualiza os votos com os dados da planilha
        }
    });
}

async function updateVotes() {
    const values = Object.entries(votos);
    const body = {
        range: VOTING_RANGE,
        majorDimension: "ROWS",
        values: values
    };

    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${VOTING_RANGE}?key=${API_KEY}&valueInputOption=USER_ENTERED`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log('Votos atualizados:', data);
}

async function vote(opcao) {
    votos[opcao]++;
    await updateVotes(); // Atualiza a planilha
    atualizarResultados(); // Atualiza a visualização dos resultados
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

// Carrega os votos ao iniciar
document.addEventListener('DOMContentLoaded', async () => {
    await fetchVotes(); // Recupera os votos ao carregar a página
    atualizarResultados(); // Atualiza a visualização dos resultados
});
