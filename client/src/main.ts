import * as THREE from "three";

import { CWorldF } from "./cworldf";
import { CObject, CCube, CBall } from "./cobjects"
import { CCameraController } from "./ccameracontroller";

const cworldf = new CWorldF();
const ccc = new CCameraController(cworldf.camera);

for (let i = 0; i < 100; i++) {
  const ccube = new CCube({ mass: i + 1, position: { x: 0, y: 10 + i, z: 0 }, velocity: { x: 0, y: -5, z: 0 }, size: { x: 0.1, y: 0.1, z: 0.1 } });
  cworldf.addCObject(ccube);
}
for (let i = 0; i < 100; i++) {
  const cball = new CBall({ mass: i + 1, position: { x: 1, y: 3 + i, z: -1 }, velocity: { x: 0, y: 10, z: 0 }, size: 0.1 });
  cworldf.addCObject(cball);
}

CObject.loader.load("/assets/models/book.glb", (gltf) => {
  cworldf.scene.add(gltf.scene);
  gltf.scene.scale.set(10, 10, 10);
  gltf.scene.position.set(0, 2, 0);
});


const clock = new THREE.Clock();
function animate() {
  const deltaTime = clock.getDelta();
  ccc.moveCamera(deltaTime);
  cworldf.updateAndRender();
}
cworldf.setAnimationLoop(animate);
