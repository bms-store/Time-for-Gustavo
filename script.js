// =======================================================
//     PARTE 1: SELETORES E CONSTANTES
// =======================================================

// Seleciona os elementos do HTML que vamos manipular
const containerTemporizador = document.getElementById("container-temporizador");
const conteudoSecreto = document.getElementById("conteudo-secreto");

// ✅ CORREÇÃO: Removi a linha abaixo, pois o botão de notificação não existe mais no HTML.
// const btnNotificacao = document.getElementById("btn-notificacao");

// Definição da data final do temporizador (ajuste como precisar)
const dataFinal = new Date("Nov 17, 2025 07:00:00").getTime();


// =======================================================
//     PARTE 2: LÓGICA DO TEMPORIZADOR
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



