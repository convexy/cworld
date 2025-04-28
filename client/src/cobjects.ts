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