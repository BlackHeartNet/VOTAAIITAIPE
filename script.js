let votes = {
    "Opção 1": 0,
    "Opção 2": 0,
    "Opção 3": 0,
};

function vote(option) {
    votes[option]++;
    displayResults();
}

function displayResults() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>Resultados:</h3>
        <p>Opção 1: TED E MARCELO - ${votes["Opção 1"]} votos</p>
        <p>Opção 2: DÉ CARAJE E WAGNER - ${votes["Opção 2"]} votos</p>
        <p>Opção 3: MARCONI E LUANDER - ${votes["Opção 3"]} votos</p>
    `;
}
