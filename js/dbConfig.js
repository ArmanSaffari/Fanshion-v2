
const firebaseConfig = {
  apiKey: "AIzaSyBVmxbqkMA_pA7zbf1hquSjnPGPRScg1_o",
  authDomain: "fanshion-815a6.firebaseapp.com",
  projectId: "fanshion-815a6",
  storageBucket: "fanshion-815a6.appspot.com",
  messagingSenderId: "475747810014",
  appId: "1:475747810014:web:26bf7366e8ebf28c1c204f",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = firebase.auth();

const storage = firebase.storage();