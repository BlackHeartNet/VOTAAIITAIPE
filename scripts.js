const votes = {
    opcao1: 0,
    opcao2: 0,
    opcao3: 0,
};

function vote(option) {
    votes[option]++;
    updateResults();
    alert(`Obrigado! Você votou na ${option}.`);
}

function updateResults() {
    const totalVotes = votes.opcao1 + votes.opcao2 + votes.opcao3;
    
    for (const [key, value] of Object.entries(votes)) {
        const percentage = totalVotes > 0 ? (value / totalVotes * 100).toFixed(2) : 0;
        const progressBar = document.getElementById(`result-${key}`).querySelector('.progress');
        const percentageDisplay = document.getElementById(`result-${key}`).querySelector('.percentage');

        // Atualiza a largura da barra de progresso
        progressBar.style.width = percentage + '%';
        percentageDisplay.textContent = percentage + '%';
    }
}
