import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./style.css";

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg") ?? undefined });
renderer.setPixelRatio(window.devicePixelRatio);
// Full Screen
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);

// Camera Setup
// You cannot set controls.target and camera.position to the same value.
// camera.position.z = -30; //  .position.setZ(30);
controls.target.set(0, 0, -1);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 5, 5);
scene.add(pointLight, ambientLight);

// HelperGrids
const pointLightHelper = new THREE.PointLightHelper(pointLight);
const gripHelper = new THREE.GridHelper(200, 50);
scene.add(pointLightHelper, gripHelper);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const moonNormals = new THREE.TextureLoader().load("normal.jpg");

// Objects
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: moonNormals })
);
moon.position.z = -30;
scene.add(moon);

const generateStars = (count: number, range: number) => {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.1,
  });

  for (let i = 0; i < count; i++) {
    const star = new THREE.Mesh(geometry, material);
    star.position.set(
      THREE.MathUtils.randFloatSpread(range),
      THREE.MathUtils.randFloatSpread(range),
      THREE.MathUtils.randFloatSpread(range)
    );
    scene.add(star);
  }
};

generateStars(1000, 500);

function tick() {
  requestAnimationFrame(tick);

  // z index is important
  controls.update();
  renderer.render(scene, camera);
}

tick();

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.x += 0.075;
  moon.rotation.z += 0.05;
  camera.position.z = t * -0.01;
  camera.position.setX(t * -0.0002);
  camera.position.setY(t * -0.0002);
}

document.body.onscroll = moveCamera;
