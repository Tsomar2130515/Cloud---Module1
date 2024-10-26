importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js')

//Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyALm0CjDnEfTIP8Ic88gBdekXRHWsoGgNo",
  authDomain: "my-app-279e9.firebaseapp.com",
  projectId: "my-app-279e9",
  storageBucket: "my-app-279e9.appspot.com",
  messagingSenderId: "1055061081629",
  appId: "1:1055061081629:web:992cb8fb108af9e46f90f4",
};
const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging(app);

//Configuration de la notification
messaging.onBackgroundMessage((payload) => {
    console.log("Notification reçue: ", payload)
    const titre = payload.data.message
    const options = {
        body: payload.data.message,
    }
    self.registration.showNotification(titre, options)
})
