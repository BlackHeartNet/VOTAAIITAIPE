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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

let votos = {
    "TED E MARCELO": 0,
    "DÉ CARAJE E WAGNER": 0,
    "MARCONI E LUANDER": 0
};

// Carrega os resultados do Firestore
db.collection("votacoes").doc("resultados").get().then((doc) => {
    if (doc.exists) {
        votos = doc.data();
        atualizarResultados();
    } else {
        // Se o documento não existir, cria um novo com os votos inicializados
        db.collection("votacoes").doc("resultados").set(votos);
    }
}).catch((error) => {
    console.error("Erro ao carregar resultados: ", error);
});

// Função para votar
function vote(opcao) {
    votos[opcao]++;
    atualizarResultados();

    // Atualiza os resultados no Firestore
    db.collection("votacoes").doc("resultados").set(votos)
        .then(() => {
            alert("Seu voto foi registrado!");
        })
        .catch((error) => {
            console.error("Erro ao atualizar resultados: ", error);
        });
}

// Atualiza os resultados na página
function atualizarResultados() {
    document.getElementById('resultado-ted').innerText = votos["TED E MARCELO"];
    document.getElementById('resultado-de').innerText = votos["DÉ CARAJE E WAGNER"];
    document.getElementById('resultado-marconi').innerText = votos["MARCONI E LUANDER"];
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
