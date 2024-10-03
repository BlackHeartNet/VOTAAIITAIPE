const votes = {
    opcao1: 0,
    opcao2: 0,
    opcao3: 0,
};

function vote(option) {
    const confirmation = confirm(`Você tem certeza de que deseja votar na ${option}?`);
    if (confirmation) {
        votes[option]++;
        updateResults();
        alert(`Obrigado! Você votou na ${option}.`);
    }
}

function updateResults() {
    const totalVotes = votes.opcao1 + votes.opcao2 + votes.opcao3;

    // Atualiza a contagem no resumo de votos
    document.getElementById('count-opcao1').textContent = `${votes.opcao1} votos`;
    document.getElementById('count-opcao2').textContent = `${votes.opcao2} votos`;
    document.getElementById('count-opcao3').textContent = `${votes.opcao3} votos`;
    
    for (const [key, value] of Object.entries(votes)) {
        const percentage = totalVotes > 0 ? (value / totalVotes * 100).toFixed(2) : 0;
        const progressBar = document.getElementById(`result-${key}`).querySelector('.progress');
        const percentageDisplay = document.getElementById(`result-${key}`).querySelector('.percentage');

        // Atualiza a largura da barra de progresso
        progressBar.style.width = percentage + '%';
        percentageDisplay.textContent = percentage + '%';
    }
}
