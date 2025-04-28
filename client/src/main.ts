import * as THREE from "three";

import { CCameraController } from "./ccameracontroller";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xddeeff);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
camera.position.set(7, 5, 7);
camera.lookAt(0, 5, 0);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(10, 100, -10);
directionalLight.lookAt(0, 0, 0);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 200;
scene.add(directionalLight);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);

const goundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
const groundMesh = new THREE.Mesh(goundGeometry, groundMaterial);
groundMesh.rotation.x = -Math.PI / 2;
groundMesh.receiveShadow = true;
scene.add(groundMesh);

const ccc = new CCameraController(camera);

const clock = new THREE.Clock();
function animate() {
  const deltaTime = clock.getDelta();
  ccc.moveCamera(deltaTime);
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
