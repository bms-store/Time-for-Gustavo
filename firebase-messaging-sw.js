// Importa os scripts do Firebase para o Service Worker
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// Cole a MESMA configuração do passo anterior
const firebaseConfig = {
    apiKey: "AIzaSyC7-G7JwuortDrhqkSDMusso9KspBBWmk1Q",
    authDomain: "bmsa-9e74e.firebaseapp.com",
    projectId: "bmsa-9e74e",
    storageBucket: "bmsa-9e74e.appspot.com",
    messagingSenderId: "43400942405",
    appId: "1:43400942405:web:fa21f5787940d8dbfee42c",
};

// Inicializa o app do Firebase no Service Worker
firebase.initializeApp(firebaseConfig);

// Obtém a instância do Messaging
const messaging = firebase.messaging();

// Opcional: Manipula notificações recebidas em segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // Você pode adicionar um ícone se quiser
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});