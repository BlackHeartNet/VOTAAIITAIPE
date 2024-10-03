// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDwA08nYaCD3ns99CXi2DgngsaucR_ySIU",
    authDomain: "votaaiitaipe.firebaseapp.com",
    databaseURL: "https://votaaiitaipe-default-rtdb.firebaseio.com",
    projectId: "votaaiitaipe",
    storageBucket: "votaaiitaipe.appspot.com",
    messagingSenderId: "452394212573",
    appId: "1:452394212573:web:8f1c52d40ddc8e0023cf34",
    measurementId: "G-N4LEFSJ1ZS"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const votes = {
    opcao1: 0,
    opcao2: 0,
    opcao3: 0,
};

function vote(option) {
    const confirmation = confirm(`Você tem certeza de que deseja votar na ${option}?`);
    if (confirmation) {
        db.collection("votes").doc(option).update({
            votes: firebase.firestore.FieldValue.increment(1)
        }).then(() => {
            alert(`Obrigado! Você votou na ${option}.`);
        });
    }
}

function updateResults() {
    db.collection("votes").get().then(snapshot => {
        let totalVotes = 0;
        snapshot.forEach(doc => {
            votes[doc.id] = doc.data().votes || 0;
            totalVotes += votes[doc.id];
        });
        
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
    });
}

// Atualiza os resultados em tempo real
db.collection("votes").onSnapshot(updateResults);

// Inicializa os votos no Firestore se não existirem
function initVotes() {
    const options = ["opcao1", "opcao2", "opcao3"];
    options.forEach(option => {
        db.collection("votes").doc(option).set({ votes: 0 }, { merge: true });
    });
}

initVotes();
