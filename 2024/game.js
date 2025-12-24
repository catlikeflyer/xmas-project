// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  doc,
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { FIREBASE_API_KEY } from "./config.js";

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

const gameContainer = document.getElementById("gameContainer");
const scoreElement = document.getElementById("score");
const bgmusic = new Audio("sounds/bgmusic.mp3");
bgmusic.loop = true;
bgmusic.play();

let score = 0;
let gameOver = false;
const toadImages = [
  "missile-toads/ms1.png",
  "missile-toads/ms2.png",
  "missile-toads/ms3.png",
];

// Save score to Firestore
async function saveScore(nickname) {
  await addDoc(collection(db, "utmt-leaderboard"), {
    nickname,
    score,
    timestamp: new Date(),
  });
  console.log("Score saved!");
  window.location.href = "leaderboard.html";
}

// Create a missile toad
function createMissileToad() {
  const toad = document.createElement("div");
  toad.className = "missileToad";
  toad.style.backgroundImage = `url(${
    toadImages[Math.floor(Math.random() * toadImages.length)]
  })`;
  toad.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
  toad.style.top = `-100px`;

  gameContainer.appendChild(toad);

  const fallDuration = Math.random() * 4 + 1; // Fall duration between 2-4 seconds
  toad.style.transition = `top ${fallDuration}s linear`;
  setTimeout(() => {
    toad.style.top = `${window.innerHeight}px`;
  }, 10);

  toad.addEventListener("click", () => {
    // Play sound
    const audio = new Audio("sounds/fx.mp3");
    audio.play();
    score++;
    scoreElement.textContent = `Score: ${score}`;
    toad.remove();
  });

  // Check if the toad reaches the bottom
  setTimeout(() => {
    if (!gameOver && gameContainer.contains(toad)) {
      gameOver = true;
      alert(`Game Over! Your score: ${score}`);
      const nickname = prompt("Enter your nickname: ");
      if (nickname) saveScore(nickname);
      else window.location.reload();
    }
  }, fallDuration * 1000);
}

// Add missile toads periodically
setInterval(() => {
  if (!gameOver) createMissileToad();
}, 1200);
