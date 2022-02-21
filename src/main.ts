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

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// no light source required
const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });

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
