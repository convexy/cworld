import * as THREE from "three";

export class CWorldF {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  ambientLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xddeeff);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);
    this.camera.position.set(7, 5, 7);
    this.camera.lookAt(0, 5, 0);

    this.ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xffffff);
    this.directionalLight.position.set(10, 100, -10);
    this.directionalLight.lookAt(0, 0, 0);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;
    this.directionalLight.shadow.camera.left = -100;
    this.directionalLight.shadow.camera.right = 100;
    this.directionalLight.shadow.camera.top = 100;
    this.directionalLight.shadow.camera.bottom = -100;
    this.directionalLight.shadow.camera.near = 0.1;
    this.directionalLight.shadow.camera.far = 200;
    this.scene.add(this.directionalLight);

    this.addHelper();
    this.addGround();
  }
  addHelper() {
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
    const gridHelper = new THREE.GridHelper(100, 100);
    this.scene.add(gridHelper);
  }
  addGround() {
    const goundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
    const groundMesh = new THREE.Mesh(goundGeometry, groundMaterial);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    this.scene.add(groundMesh);
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  setAnimationLoop(callback: XRFrameRequestCallback) {
    this.renderer.setAnimationLoop(callback);
  }
}