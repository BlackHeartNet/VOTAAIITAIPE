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

// Contadores de cliques
let clickCounter1 = 0;
let clickCounter2 = 0;
let clickCounter3 = 0;

// Função para votar
function vote(option) {
    if (option === 'opcao1') {
        clickCounter1++;
        updateVoteCount('opcao1', clickCounter1);
    } else if (option === 'opcao2') {
        clickCounter2++;
        updateVoteCount('opcao2', clickCounter2);
    } else if (option === 'opcao3') {
        clickCounter3++;
        updateVoteCount('opcao3', clickCounter3);
    }
}

// Função para atualizar a contagem visual de votos no resumo
function updateVoteCount(option, count) {
    const countElement = document.getElementById(`summary-count-${option}`);
    countElement.textContent = `${count} votos`;

    // Atualiza o Firestore
    db.collection("votes").doc(option).set({
        votes: count
    }, { merge: true }).catch(error => {
        console.error("Erro ao atualizar votos: ", error);
    });
}

// Inicializa os votos no Firestore se não existirem
function initVotes() {
    const options = ["opcao1", "opcao2", "opcao3"];
    options.forEach(option => {
        db.collection("votes").doc(option).get().then(doc => {
            if (!doc.exists) {
                db.collection("votes").doc(option).set({ votes: 0 });
            }
        }).catch(error => {
            console.error("Erro ao inicializar votos: ", error);
        });
    });
}

// Chama a inicialização
initVotes();
