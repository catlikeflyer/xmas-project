// Interactive world map with Christmas traditions
// Country data embedded directly

const countryName = document.getElementById("country-name");
const countryFact = document.getElementById("country-fact");
const countryMusic = document.getElementById("country-music");

// Country data
const countryData = {
  US: {
    name: "United States",
    fact: "In the US, Christmas stockings are hung by the fireplace for Santa to fill with gifts. Families decorate trees and leave cookies and milk for Santa.",
    music:
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Jingle_Bells.ogg",
  },
  MX: {
    name: "Mexico",
    fact: "Mexicans celebrate Las Posadas, a reenactment of Mary and Joseph's search for shelter. The celebration includes piñatas, traditional foods, and nativity scenes.",
    music:
      "https://upload.wikimedia.org/wikipedia/commons/2/2e/Noche_de_Paz.ogg",
  },
  DE: {
    name: "Germany",
    fact: "Germany is famous for its Christmas markets (Weihnachtsmärkte) and the tradition of the Advent calendar. The Christmas tree tradition also originated here!",
    music:
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/O_Tannenbaum.ogg",
  },
  JP: {
    name: "Japan",
    fact: "In Japan, Christmas is celebrated with KFC and strawberry shortcake! It's more of a romantic holiday than a family one, similar to Valentine's Day.",
    music: "",
  },
  AU: {
    name: "Australia",
    fact: "Christmas in Australia is during summer, so many celebrate with a BBQ on the beach. Santa sometimes arrives on a surfboard instead of a sleigh!",
    music: "",
  },
};

// Add click handlers to all country elements
document.querySelectorAll(".country").forEach((country) => {
  country.style.cursor = "pointer";
  country.style.transition = "opacity 0.2s";

  country.addEventListener("mouseenter", () => {
    country.style.opacity = "0.7";
  });

  country.addEventListener("mouseleave", () => {
    country.style.opacity = "1";
  });

  country.addEventListener("click", () => {
    const countryCode = country.id;
    if (countryData[countryCode]) {
      showCountryInfo(countryCode, countryData[countryCode]);
    }
  });
});

function showCountryInfo(code, info) {
  countryName.textContent = info.name;
  countryFact.textContent = info.fact;
  if (info.music) {
    countryMusic.src = info.music;
    countryMusic.style.display = "block";
    countryMusic.play();
  } else {
    countryMusic.style.display = "none";
    countryMusic.pause();
  }
}
