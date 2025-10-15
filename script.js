// =======================================================
//     PARTE 1: SELETORES E CONSTANTES
// =======================================================

// Seleciona todos os elementos do HTML que vamos manipular de uma só vez
const containerTemporizador = document.getElementById("container-temporizador");
const elementoTemporizador = document.getElementById("temporizador");
const conteudoSecreto = document.getElementById("conteudo-secreto");
const btnNotificacao = document.getElementById("btn-notificacao");

// Definição da data final
const dataFinal = new Date("Oct 15, 2025 00:00:00").getTime();

// =======================================================
//     PARTE 2: LÓGICA DAS NOTIFICAÇÕES (FIREBASE)
// =======================================================

// Função para pedir permissão e obter o token do Firebase
function pedirPermissao() {
    console.log("Pedindo permissão para notificações...");
    
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Permissão concedida! Obtendo o token...');
            // Lembre-se de colocar sua VAPID Key aqui!
            return messaging.getToken({ vapidKey: 'BD3LApZY0meKlnnPtVHmtZ4jeFbQN1d7Y0RnskBhefpBnbtW1_ECpdNtxVEUB52hPTuF9z7ONYFkze8LAjDEfCw' }); 
        } else {
            console.log('Permissão foi negada pelo usuário.');
        }
    }).then((token) => {
        if (token) {
            console.log('TOKEN DO USUÁRIO (guarde isso para testes):');
            console.log(token);
            alert('Notificações ativadas com sucesso! Agora você pode fechar esta página.');
            btnNotificacao.style.display = 'none'; // Esconde o botão após o sucesso
        } else {
            console.log('Nenhum token de registro recebido. O usuário precisa permitir as notificações.');
        }
    }).catch((err) => {
        // Este 'catch' é importante para te dizer se algo deu errado na configuração do Firebase
        console.error('Ocorreu um erro ao obter o token: ', err);
        alert('Ocorreu um erro ao ativar as notificações. Verifique se sua VAPID Key está correta e olhe o console (F12) para mais detalhes.');
    });
}

// Adiciona o "ouvinte" de evento de clique ao botão de notificação
btnNotificacao.addEventListener('click', pedirPermissao);


// =======================================================
//     PARTE 3: LÓGICA DO TEMPORIZADOR (ATUALIZADA)
// =======================================================

// Seleciona os novos spans para cada unidade de tempo
const diasEl = document.getElementById("dias");
const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");

const intervalo = setInterval(function() {
    const agora = new Date().getTime();
    const distancia = dataFinal - agora;

    if (distancia > 0) {
        // Cálculos de tempo (lógica continua a mesma)
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        // Atualiza o conteúdo de cada span individualmente
        diasEl.textContent = dias;
        horasEl.textContent = horas;
        minutosEl.textContent = minutos;
        segundosEl.textContent = segundos;
    } else {
        clearInterval(intervalo);
        containerTemporizador.style.display = "none";
        conteudoSecreto.style.display = "block";
        // Adiciona a classe para ativar a animação de fade-in
        conteudoSecreto.classList.add("revelado"); 
    }

}, 1000);

