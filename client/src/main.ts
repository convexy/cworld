import * as THREE from "three";
import * as CANNON from "cannon";

import { CWorldF } from "./cworldf";
import { CObject, CCube, CBall } from "./cobjects"
import { CCameraController } from "./ccameracontroller";

const cworldf = new CWorldF({ helper: true, ground: true });
const ccc = new CCameraController(cworldf.camera);

for (let i = 0; i < 100; i++) {
  const ccube = new CCube({ mass: i + 1, position: { x: 0, y: 10 + i, z: 0 }, velocity: { x: 0, y: -5, z: 0 }, size: { x: 0.1, y: 0.1, z: 0.1 } });
  cworldf.addCObject(ccube);
}
for (let i = 0; i < 100; i++) {
  const cball = new CBall({ mass: i + 1, position: { x: 1, y: 3 + i, z: -1 }, velocity: { x: 0, y: 10, z: 0 }, size: 0.1 });
  cworldf.addCObject(cball);
}

// CObject.loader.load("/assets/models/book.glb", (gltf) => {
//   gltf.scene.scale.set(10, 10, 10);
//   const book = new CObject(new CANNON.Body({
//     mass: 1,
//     shape: new CANNON.Box(new CANNON.Vec3(1, 0.02, 1)),
//     position: new CANNON.Vec3(2, 3, 2),
//   }), gltf.scene)
//   cworldf.addCObject(book);
// });


const clock = new THREE.Clock();
function animate() {
  const deltaTime = clock.getDelta();
  ccc.moveCamera(deltaTime);
  cworldf.updateAndRender(deltaTime);
}
cworldf.setAnimationLoop(animate);
