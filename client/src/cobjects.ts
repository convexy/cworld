import * as THREE from "three";
import * as CANNON from "cannon";

export class CObject {
  body: CANNON.Body;
  mesh: THREE.Object3D;
  constructor(body: CANNON.Body, mesh: THREE.Object3D) {
    this.body = body;
    this.mesh = mesh;
  }
}

export class CBall extends CObject {
  constructor() {
    const body = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Sphere(1),
      position: new CANNON.Vec3(0, 5, 0),
    });
    const geometry = new THREE.SphereGeometry(1);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ffff });
    const mesh = new THREE.Mesh(geometry, material);
    super(body, mesh);
  }
}

export class CCube extends CObject {
  constructor() {
    const body = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
      position: new CANNON.Vec3(-1, 10, 1),
    });
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ffff });
    const mesh = new THREE.Mesh(geometry, material);
    super(body, mesh);
  }
}