import "./style.css";

// const app = document.querySelector<HTMLDivElement>("#app")!;

// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `;

import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg") ?? undefined });

renderer.setPixelRatio(window.devicePixelRatio);
// Full Screen
renderer.setSize(window.innerWidth, window.innerHeight);
// Move Camera back
camera.position.setZ(30);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 5, 5);
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight);
const gripHelper = new THREE.GridHelper(200, 50);
scene.add(pointLightHelper, gripHelper);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// MeshBasicMaterial = no light source required
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

function tick() {
  requestAnimationFrame(tick);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.0005;

  renderer.render(scene, camera);
}

tick();
