import * as THREE from "three";

import { CWorldF } from "./cworldf";
import { CCube, CBall } from "./cobjects"
import { CCameraController } from "./ccameracontroller";

const cworldf = new CWorldF();
const ccc = new CCameraController(cworldf.camera);

const ccube = new CCube();
const cball = new CBall();
cworldf.addCObject(ccube);
cworldf.addCObject(cball);

const clock = new THREE.Clock();
function animate() {
  const deltaTime = clock.getDelta();
  ccc.moveCamera(deltaTime);
  cworldf.updateAndRender();
}
cworldf.setAnimationLoop(animate);
