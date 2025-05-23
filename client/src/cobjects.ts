import * as THREE from "three";
import * as CANNON from "cannon";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

interface CObjectOptions {
  mass?: number,
  position?: { x: number, y: number, z: number },
  velocity?: { x: number, y: number, z: number },
  size?: number | { x: number, y: number, z: number }
}

export class CObject {
  static loader: GLTFLoader = new GLTFLoader();
  body: CANNON.Body;
  mesh: THREE.Object3D;
  constructor(body: CANNON.Body, mesh: THREE.Object3D) {
    this.body = body;
    this.mesh = mesh;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }
}

export class CBall extends CObject {
  constructor(options?: CObjectOptions) {
    const size = typeof options?.size === "number" ? options?.size : 1;
    const body = new CANNON.Body({
      mass: options?.mass ?? 1,
      shape: new CANNON.Sphere(size),
      position: new CANNON.Vec3(options?.position?.x ?? 0, options?.position?.y ?? 0, options?.position?.z ?? 0),
      velocity: new CANNON.Vec3(options?.velocity?.x ?? 0, options?.velocity?.y ?? 0, options?.velocity?.z ?? 0),
    });
    const geometry = new THREE.SphereGeometry(size);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ffff });
    const mesh = new THREE.Mesh(geometry, material);
    super(body, mesh);
  }
}

export class CCube extends CObject {
  constructor(options?: CObjectOptions) {
    const size =
      typeof options?.size === "number"
        ? { x: options?.size ?? 1, y: options?.size ?? 1, z: options?.size ?? 1 }
        : { x: options?.size?.x ?? 1, y: options?.size?.y ?? 1, z: options?.size?.z ?? 1 };
    const body = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2)),
      position: new CANNON.Vec3(options?.position?.x ?? 0, options?.position?.y ?? 0, options?.position?.z ?? 0),
      velocity: new CANNON.Vec3(options?.velocity?.x ?? 0, options?.velocity?.y ?? 0, options?.velocity?.z ?? 0),
    });
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ffff });
    const mesh = new THREE.Mesh(geometry, material);
    super(body, mesh);
  }
}

export class CCylinder extends CObject {
  constructor(options?: { mass?: number, h?: number, r?: number }) {
    const height = options?.h ?? 1;
    const radius = options?.r ?? 1;
    const body = new CANNON.Body({
      mass: options?.mass ?? 1,
      shape: new CANNON.Cylinder(radius, radius, height, 8),
    });
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 8);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    super(body, mesh);
  }
}