// =======================================================
//     PARTE 1: SELETORES E CONSTANTES
// =======================================================
const containerTemporizador = document.getElementById("container-temporizador");
const elementoTemporizador = document.getElementById("temporizador");
const conteudoSecreto = document.getElementById("conteudo-secreto");
const btnNotificacao = document.getElementById("btn-notificacao");

const dataFinal = new Date("Out 15, 2025 00:10:00").getTime();

// =======================================================
//     PARTE 2: LÓGICA DAS NOTIFICAÇÕES (FIREBASE) - CORRIGIDA
// =======================================================

// ▼▼▼ ADICIONE O NOME DA SUA SUBPASTA/REPOSITÓRIO AQUI ▼▼▼
const CAMINHO_DO_SITE = '/Time-for-Gustavo/';

// Função para pedir permissão e obter o token do Firebase
function pedirPermissao() {
    console.log("Registrando o Service Worker em: " + CAMINHO_DO_SITE + 'firebase-messaging-sw.js');

    // PASSO NOVO E CRUCIAL: Registra o Service Worker no caminho correto
    navigator.serviceWorker.register(CAMINHO_DO_SITE + 'firebase-messaging-sw.js')
    .then((registration) => {
        console.log('Service Worker registrado com sucesso!', registration);
        console.log("Pedindo permissão para notificações...");
        return Notification.requestPermission(); // Pede a permissão do usuário
    })
    .then((permission) => {
        if (permission === 'granted') {
            console.log('Permissão concedida! Obtendo o token...');
            return messaging.getToken({ 
                vapidKey: 'BD3LApZY0meKlnnPtVHmtZ4jeFbQN1d7Y0RnskBhefpBnbtW1_ECpdNtxVEUB52hPTuF9z7ONYFkze8LAjDEfCw',
                serviceWorkerRegistration: navigator.serviceWorker.ready // Usa o SW que acabamos de registrar
            }); 
        } else {
            console.log('Permissão foi negada pelo usuário.');
            throw new Error('Permissão negada'); // Para a execução se for negada
        }
    }).then((token) => {
        if (token) {
            console.log('TOKEN DO USUÁRIO (guarde isso para testes):');
            console.log(token);
            alert('Notificações ativadas com sucesso! Agora você pode fechar esta página.');
            btnNotificacao.style.display = 'none';
        } else {
            console.log('Nenhum token de registro recebido.');
        }
    }).catch((err) => {
        console.error('Ocorreu um erro ao obter o token: ', err);
        alert('Ocorreu um erro ao ativar as notificações. Verifique se sua VAPID Key está correta e olhe o console (F12) para mais detalhes.');
    });
}

// Adiciona o "ouvinte" de evento de clique ao botão de notificação
btnNotificacao.addEventListener('click', pedirPermissao);


// =======================================================
//     PARTE 3: LÓGICA DO TEMPORIZADOR (ATUALIZADA)
// =======================================================
const diasEl = document.getElementById("dias");
const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");

const intervalo = setInterval(function() {
    const agora = new Date().getTime();
    const distancia = dataFinal - agora;

    if (distancia > 0) {
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        diasEl.textContent = dias;
        horasEl.textContent = horas;
        minutosEl.textContent = minutos;
        segundosEl.textContent = segundos;
    } else {
        clearInterval(intervalo);
        containerTemporizador.style.display = "none";
        conteudoSecreto.style.display = "block";
        conteudoSecreto.classList.add("revelado"); 
    }
}, 1000);
