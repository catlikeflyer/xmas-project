// 3D Globe with Christmas traditions using Three.js

const countryName = document.getElementById("country-name");
const countryFact = document.getElementById("country-fact");
const countryMusic = document.getElementById("country-music");

// Country data with coordinates (latitude, longitude)
const countryData = {
  US: {
    name: "United States 🇺🇸",
    fact: "In the US, Christmas stockings are hung by the fireplace for Santa to fill with gifts. Families decorate trees and leave cookies and milk for Santa.",
    music:
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Jingle_Bells.ogg",
    lat: 37.0902,
    lon: -95.7129,
  },
  MX: {
    name: "Mexico 🇲🇽",
    fact: "Mexicans celebrate Las Posadas, a reenactment of Mary and Joseph's search for shelter. The celebration includes piñatas, traditional foods, and nativity scenes.",
    music:
      "https://upload.wikimedia.org/wikipedia/commons/2/2e/Noche_de_Paz.ogg",
    lat: 23.6345,
    lon: -102.5528,
  },
  DE: {
    name: "Germany 🇩🇪",
    fact: "Germany is famous for its Christmas markets (Weihnachtsmärkte) and the tradition of the Advent calendar. The Christmas tree tradition also originated here!",
    music:
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/O_Tannenbaum.ogg",
    lat: 51.1657,
    lon: 10.4515,
  },
  JP: {
    name: "Japan 🇯🇵",
    fact: "In Japan, Christmas is celebrated with KFC and strawberry shortcake! It's more of a romantic holiday than a family one, similar to Valentine's Day.",
    music: "",
    lat: 36.2048,
    lon: 138.2529,
  },
  AU: {
    name: "Australia 🇦🇺",
    fact: "Christmas in Australia is during summer, so many celebrate with a BBQ on the beach. Santa sometimes arrives on a surfboard instead of a sleigh!",
    music: "",
    lat: -25.2744,
    lon: 133.7751,
  },
  BR: {
    name: "Brazil 🇧🇷",
    fact: "In Brazil, Christmas is celebrated in summer with Papai Noel (Santa) wearing silk! Families gather for midnight mass and enjoy a festive dinner.",
    music: "",
    lat: -14.235,
    lon: -51.9253,
  },
  IT: {
    name: "Italy 🇮🇹",
    fact: "Italians celebrate with La Befana, a witch who brings gifts on January 6th. The Christmas season includes elaborate nativity scenes called 'presepi'.",
    music: "",
    lat: 41.8719,
    lon: 12.5674,
  },
  IN: {
    name: "India 🇮🇳",
    fact: "Christians in India decorate mango and banana trees and light small oil lamps on rooftops and walls. Clay lamps illuminate homes during Christmas.",
    music: "",
    lat: 20.5937,
    lon: 78.9629,
  },
  GB: {
    name: "United Kingdom 🇬🇧",
    fact: "In the UK, Christmas crackers are pulled at dinner, revealing paper hats and jokes. Mince pies and Christmas pudding are traditional treats.",
    music: "",
    lat: 55.3781,
    lon: -3.436,
  },
  FR: {
    name: "France 🇫🇷",
    fact: "French children leave their shoes by the fireplace for Père Noël to fill. The Yule log cake (Bûche de Noël) is a beloved dessert.",
    music: "",
    lat: 46.2276,
    lon: 2.2137,
  },
  ES: {
    name: "Spain 🇪🇸",
    fact: "In Spain, the main gift-giving day is January 6th (Three Kings Day). On Christmas Eve, families gather for a big feast after midnight mass.",
    music: "",
    lat: 40.4637,
    lon: -3.7492,
  },
  RU: {
    name: "Russia 🇷🇺",
    fact: "Russia celebrates Christmas on January 7th. Grandfather Frost (Ded Moroz) and his granddaughter deliver gifts during New Year celebrations.",
    music: "",
    lat: 61.524,
    lon: 105.3188,
  },
  CN: {
    name: "China 🇨🇳",
    fact: "Christmas is growing in popularity in China. People decorate with paper chains and lanterns, and give apples as gifts on Christmas Eve.",
    music: "",
    lat: 35.8617,
    lon: 104.1954,
  },
  ZA: {
    name: "South Africa 🇿🇦",
    fact: "Christmas in South Africa is during summer! Families enjoy outdoor braais (barbecues) and caroling in the streets.",
    music: "",
    lat: -30.5595,
    lon: 22.9375,
  },
  SE: {
    name: "Sweden 🇸🇪",
    fact: "Swedes celebrate with a Julbord feast and watch Donald Duck on TV every Christmas Eve. St. Lucia Day on December 13th kicks off the season.",
    music: "",
    lat: 60.1282,
    lon: 18.6435,
  },
  PH: {
    name: "Philippines 🇵🇭",
    fact: "The Philippines has the longest Christmas season, starting in September! Giant lanterns (parols) decorate homes and the Simbang Gabi (night mass) is a beloved tradition.",
    music: "",
    lat: 12.8797,
    lon: 121.774,
  },
  EG: {
    name: "Egypt 🇪🇬",
    fact: "Coptic Christians in Egypt celebrate Christmas on January 7th. They fast for 43 days before Christmas and break the fast with a special meal called fatta.",
    music: "",
    lat: 26.8206,
    lon: 30.8025,
  },
  CA: {
    name: "Canada 🇨🇦",
    fact: "Canadians enjoy ice skating, hockey, and winter sports during Christmas. Many write letters to Santa with the postal code H0H 0H0 (North Pole)!",
    music: "",
    lat: 56.1304,
    lon: -106.3468,
  },
  KR: {
    name: "South Korea 🇰🇷",
    fact: "South Koreans celebrate Christmas with beautiful light displays in cities. Many attend midnight mass and exchange gifts. Christmas cake, especially from local bakeries, is a popular tradition!",
    music: "",
    lat: 37.5665,
    lon: 126.978,
  },
};

// Scene setup
const scene = new THREE.Scene();
const container = document.getElementById("globe-container");
const containerWidth = Math.min(window.innerWidth * 0.9, 800);
const containerHeight = Math.min(window.innerHeight * 0.6, 600);

const camera = new THREE.PerspectiveCamera(
  75,
  containerWidth / containerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(containerWidth, containerHeight);
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

// Create Earth
const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
const earthTexture = new THREE.TextureLoader().load(
  "https://unpkg.com/three-globe@2.24.11/example/img/earth-blue-marble.jpg",
  () => {
    console.log("Texture loaded");
  },
  undefined,
  () => {
    // Fallback if texture fails to load
    earthMaterial.color.set(0x2233ff);
  }
);
const earthMaterial = new THREE.MeshPhongMaterial({
  map: earthTexture,
  bumpScale: 0.05,
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Add atmosphere glow
const atmosphereGeometry = new THREE.SphereGeometry(2.1, 64, 64);
const atmosphereMaterial = new THREE.MeshPhongMaterial({
  color: 0x93cfef,
  transparent: true,
  opacity: 0.15,
  side: THREE.BackSide,
});
const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
scene.add(atmosphere);

// Create Christmas tree markers for countries
const markers = [];

// Create a Christmas tree shape using cones and spheres
function createChristmasTreeMarker() {
  const treeGroup = new THREE.Group();

  // Tree body (3 stacked cones)
  const coneGeometry1 = new THREE.ConeGeometry(0.08, 0.12, 8);
  const coneGeometry2 = new THREE.ConeGeometry(0.06, 0.1, 8);
  const coneGeometry3 = new THREE.ConeGeometry(0.04, 0.08, 8);
  const treeMaterial = new THREE.MeshPhongMaterial({
    color: 0x2d5016,
    emissive: 0x00ff00,
    emissiveIntensity: 0.3,
  });

  const cone1 = new THREE.Mesh(coneGeometry1, treeMaterial);
  cone1.position.y = 0;

  const cone2 = new THREE.Mesh(coneGeometry2, treeMaterial);
  cone2.position.y = 0.08;

  const cone3 = new THREE.Mesh(coneGeometry3, treeMaterial);
  cone3.position.y = 0.14;

  treeGroup.add(cone1);
  treeGroup.add(cone2);
  treeGroup.add(cone3);

  // Star on top
  const starGeometry = new THREE.SphereGeometry(0.02, 8, 8);
  const starMaterial = new THREE.MeshPhongMaterial({
    color: 0xffd700,
    emissive: 0xffff00,
    emissiveIntensity: 0.8,
  });
  const star = new THREE.Mesh(starGeometry, starMaterial);
  star.position.y = 0.2;
  treeGroup.add(star);

  // Ornaments (small colored spheres)
  const ornamentColors = [0xff0000, 0x0000ff, 0xffd700, 0xff69b4];
  for (let i = 0; i < 4; i++) {
    const ornamentGeometry = new THREE.SphereGeometry(0.015, 8, 8);
    const ornamentMaterial = new THREE.MeshPhongMaterial({
      color: ornamentColors[i],
      emissive: ornamentColors[i],
      emissiveIntensity: 0.4,
    });
    const ornament = new THREE.Mesh(ornamentGeometry, ornamentMaterial);
    const angle = (i / 4) * Math.PI * 2;
    ornament.position.x = Math.cos(angle) * 0.04;
    ornament.position.z = Math.sin(angle) * 0.04;
    ornament.position.y = 0.02;
    treeGroup.add(ornament);
  }

  return treeGroup;
}

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

Object.keys(countryData).forEach((code) => {
  const country = countryData[code];
  const marker = createChristmasTreeMarker();

  const position = latLonToVector3(country.lat, country.lon, 2.05);
  marker.position.copy(position);

  // Orient tree to point away from earth center
  marker.lookAt(position.x * 2, position.y * 2, position.z * 2);
  marker.rotateX(Math.PI / 2);

  marker.userData = { code, country };

  markers.push(marker);
  earth.add(marker);

  // Add pulsing animation
  marker.userData.scale = 1;
  marker.userData.baseScale = 1.5;
});

camera.position.z = 5;

// Mouse and Touch interaction
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotation = { x: 0, y: 0 };

renderer.domElement.addEventListener("mousedown", (e) => {
  isDragging = true;
  previousMousePosition = { x: e.clientX, y: e.clientY };
});

renderer.domElement.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    rotation.y += deltaX * 0.005;
    rotation.x += deltaY * 0.005;

    previousMousePosition = { x: e.clientX, y: e.clientY };
  }
});

renderer.domElement.addEventListener("mouseup", () => {
  isDragging = false;
});

// Touch events for mobile
renderer.domElement.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    isDragging = true;
    previousMousePosition = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }
});

renderer.domElement.addEventListener("touchmove", (e) => {
  if (isDragging && e.touches.length === 1) {
    e.preventDefault(); // Prevent scrolling
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;

    rotation.y += deltaX * 0.005;
    rotation.x += deltaY * 0.005;

    previousMousePosition = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }
});

renderer.domElement.addEventListener("touchend", () => {
  isDragging = false;
});

// Click detection with raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

renderer.domElement.addEventListener("click", (event) => {
  if (isDragging) return;

  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(markers, true);

  if (intersects.length > 0) {
    // Find the parent marker group
    let clickedMarker = intersects[0].object;
    while (clickedMarker.parent && !clickedMarker.userData.code) {
      clickedMarker = clickedMarker.parent;
    }

    if (clickedMarker.userData.code) {
      const { code, country } = clickedMarker.userData;
      showCountryInfo(code, country);

      // Highlight effect - reset all markers
      markers.forEach((m) => {
        m.traverse((child) => {
          if (child.material && child.material.emissive) {
            child.material.emissiveIntensity =
              child.material.emissiveIntensity > 0.5
                ? 0.3
                : child.material.emissiveIntensity;
          }
        });
      });

      // Highlight clicked marker
      clickedMarker.traverse((child) => {
        if (child.material && child.material.emissive) {
          child.material.emissiveIntensity = 1;
        }
      });
    }
  }
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

  // Show the overlay
  const overlay = document.getElementById("country-info-overlay");
  overlay.style.display = "flex";
}

function hideCountryInfo() {
  const overlay = document.getElementById("country-info-overlay");
  overlay.style.display = "none";

  // Stop music if playing
  countryMusic.pause();
}

// Close overlay when clicking outside the card
document
  .getElementById("country-info-overlay")
  .addEventListener("click", (e) => {
    if (e.target.id === "country-info-overlay") {
      hideCountryInfo();
    }
  });

// Close overlay when clicking the close button
document.getElementById("close-overlay").addEventListener("click", () => {
  hideCountryInfo();
});

// Close overlay on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideCountryInfo();
  }
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Apply rotation
  earth.rotation.y = rotation.y;
  earth.rotation.x = rotation.x;
  atmosphere.rotation.y = rotation.y;
  atmosphere.rotation.x = rotation.x;

  // Auto-rotate slowly when not dragging
  if (!isDragging) {
    rotation.y += 0.001;
  }

  // Animate markers (pulsing effect)
  markers.forEach((marker) => {
    marker.userData.scale += 0.02;
    const baseScale = marker.userData.baseScale || 1.5;
    const scale = baseScale + Math.sin(marker.userData.scale) * 0.15;
    marker.scale.set(scale, scale, scale);
  });

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  const newWidth = Math.min(window.innerWidth * 0.9, 800);
  const newHeight = Math.min(window.innerHeight * 0.6, 600);
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
});
