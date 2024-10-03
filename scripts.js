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

// Função para votar
function vote(option) {
    // Atualiza o número de votos no Firestore
    db.collection("votes").doc(option).set({
        votes: firebase.firestore.FieldValue.increment(1)
    }, { merge: true }).then(() => {
        updateVoteCount(option);
    }).catch(error => {
        console.error("Erro ao atualizar votos: ", error);
    });
}

// Função para atualizar a contagem visual de votos no resumo
function updateVoteCount(option) {
    const countElement = document.getElementById(`summary-count-${option}`);
    db.collection("votes").doc(option).get().then(doc => {
        if (doc.exists) {
            countElement.textContent = `${doc.data().votes} votos`;
        }
    }).catch(error => {
        console.error("Erro ao obter votos: ", error);
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
