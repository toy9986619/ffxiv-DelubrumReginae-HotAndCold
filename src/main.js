import {
  Scene, PerspectiveCamera, WebGLRenderer,
  Mesh,
  AxesHelper, PlaneGeometry, PointLight,
  MeshLambertMaterial,
  MOUSE,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Character from './class/character';
import TrinityAvowed from './class/trinityAvowed';
import GlobalController from './class/globalController';
import lineFactory from './utils/lineFactory';

const globalController = new GlobalController();
const scene = new Scene();
globalController.scene = scene;

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10); // 相機位置
camera.lookAt(scene.position); // 相機焦點
globalController.camera = camera;

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const character = new Character(globalController);
scene.add(character.instance);

const trinityAvowed = new TrinityAvowed(globalController);
scene.add(trinityAvowed.instance);

const planeGeometry = new PlaneGeometry(50, 50);
const planeMaterial = new MeshLambertMaterial({ color: 0xffffff });
const plane = new Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, -1, 0);
scene.add(plane);

const pointLight = new PointLight(0xffffff);
pointLight.position.set(10, 10, -10);
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.mouseButtons = {
  RIGHT: MOUSE.ROTATE,
  MIDDLE: MOUSE.DOLLY,
};

const axes = new AxesHelper(20);
scene.add(axes);

const lineMap = [
  { start: [25, 0, 5,], end: [-25, 0, 5] },
  { start: [25, 0, 15], end: [-25, 0, 15] },
  { start: [25, 0, 25], end: [-25, 0, 25] },
  { start: [25, 0, -5], end: [-25, 0, -5] },
  { start: [25, 0, -15], end: [-25, 0, -15] },
  { start: [25, 0, -25], end: [-25, 0, -25] },
  { start: [5, 0, 25,], end: [5, 0, -25] },
  { start: [15, 0, 25,], end: [15, 0, -25] },
  { start: [25, 0, 25,], end: [25, 0, -25] },
  { start: [-5, 0, 25,], end: [-5, 0, -25] },
  { start: [-15, 0, 25,], end: [-15, 0, -25] },
  { start: [-25, 0, 25,], end: [-25, 0, -25] },
];

lineMap.forEach((pointData) => {
  const { start, end } = pointData;
  const line = lineFactory(start, end);
  scene.add(line);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  character.update();
  renderer.render(scene, camera);
}
animate();
