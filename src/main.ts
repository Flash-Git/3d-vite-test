import "./style.css";

// const app = document.querySelector<HTMLDivElement>("#app")!;

// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `;

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg") ?? undefined });

const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
// Full Screen
renderer.setSize(window.innerWidth, window.innerHeight);
// Move Camera back
// camera.position.setZ(30);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 5, 5);
scene.add(pointLight, ambientLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight);
const gripHelper = new THREE.GridHelper(200, 50);
scene.add(pointLightHelper, gripHelper);

// Objects
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.1,
  });

  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill(0)
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);

  scene.add(star);
}

Array(200).fill(0).map(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const moonNormals = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: moonNormals })
);
moon.position.z = -30;
// moon.position.setX(-10);

scene.add(moon);

function tick() {
  requestAnimationFrame(tick);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.0005;

  // controls.update();
  renderer.render(scene, camera);
}

tick();

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.x += 0.075;
  moon.rotation.z += 0.05;
  // console.log(t);
  console.log(t, t * -0.01);
  camera.position.z = t * -0.01;
  camera.position.setX(t * -0.0002);
  camera.position.setY(t * -0.0002);
}

document.body.onscroll = moveCamera;
