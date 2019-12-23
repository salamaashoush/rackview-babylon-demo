import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { PointLight } from "@babylonjs/core/Lights/pointLight";
import { Color4, Vector3 } from "@babylonjs/core/Maths/math";
import { Scene } from "@babylonjs/core/scene";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import "./babylon-side-effects";
import { RENDERING_2D_TEXTURE } from "./constants";
import { create2dPlan, createPlan, createRooms, racksToRooms } from "./utils";
import './style.css';

const canvas = document.getElementById("app") as HTMLCanvasElement;
const engine = new Engine(canvas, true);
const scene = new Scene(engine);
const camera = new FreeCamera("camera1", new Vector3(-250, 250, -250), scene);
const light1 = new HemisphericLight("hemi1", new Vector3(0, 1, 0), scene);
light1.intensity = 1;
const light2 = new PointLight("omni1", camera.position, scene);
light2.intensity = 0.25;
scene.clearColor = new Color4(0.9, 0.9, 0.85, 1.0);
scene.attachControl();

const texture = AdvancedDynamicTexture.CreateFullscreenUI(
  RENDERING_2D_TEXTURE,
  false,
  scene
);
texture.renderScale = 1.5;
texture.isForeground = false;

const mappingConfig = {
  roomPadding: 5,
  racksSpacingX: 10,
  racksSpacingY: 80,
  minRoomWidth: 100,
  minRoomDepth: 100,
  planPadding: 10,
  roomSpacingX: 50,
  roomHeight: 100,
  planHeight: 0
};

const racks = createRooms({
  rooms: 10,
  racksPerRoom: 100,
  devicesPerRack: 30,
  devicesPerPosition: 1,
  rackHeight: 49,
  racksPerRow: 3,
  deviceHeight: 1
});
const rooms = racksToRooms(racks, mappingConfig);
const planData = createPlan("plan001", rooms, mappingConfig);
texture.addControl(create2dPlan(planData));

engine.resize();
engine.runRenderLoop(() => {
  scene.render();
});
window.addEventListener("resize", () => {
  engine.resize();
});
