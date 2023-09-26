  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf2E0LyQeFBHN_DuACOJw7m6oNKyhgn1A",
  authDomain: "live-1f1d7.firebaseapp.com",
  projectId: "live-1f1d7",
  storageBucket: "live-1f1d7.appspot.com",
  messagingSenderId: "85413265472",
  appId: "1:85413265472:web:de80028c697cb08c8a1fa5",
  measurementId: "G-KSYDTRGCZF"
};

// Get a reference to the Firestore database
const db = firebase.firestore();

// Handle sending a message
document.getElementById("send-button").addEventListener("click", () => {
  const message = document.getElementById("message-input").value;
  db.collection("messages").add({
    text: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  document.getElementById("message-input").value = "";
});

// Listen for new messages and display them in the chat
db.collection("messages")
  .orderBy("timestamp")
  .onSnapshot((snapshot) => {
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML = "";
    snapshot.forEach((doc) => {
      const messageData = doc.data();
      const messageElement = document.createElement("div");
      messageElement.textContent = messageData.text;
      chatMessages.appendChild(messageElement);
    });
  });