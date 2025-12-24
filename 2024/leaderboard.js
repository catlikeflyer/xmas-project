// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  limit,
  collection,
  getDocs,
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { FIREBASE_API_KEY } from "./config.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "dhnam-xmas.firebaseapp.com",
  projectId: "dhnam-xmas",
  storageBucket: "dhnam-xmas.firebasestorage.app",
  messagingSenderId: "429827527097",
  appId: "1:429827527097:web:668b53a4bce2037d0b6668",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const leaderboardList = document.getElementById("leaderboardList");

async function fetchLeaderboard() {
  const q = query(
    collection(db, "utmt-leaderboard"),
    orderBy("score", "desc"),
    limit(10)
  );

  const snapshot = await getDocs(q);
  snapshot.forEach((doc, index) => {
    const data = doc.data();

    const listItem = document.createElement("li");
    listItem.innerHTML = `<span>${data.nickname}. Score: ${
      data.score
    }</span><span>${new Date(
      data.timestamp.toDate()
    ).toLocaleDateString()}</span>`;
    leaderboardList.appendChild(listItem);
  });
}

fetchLeaderboard();
