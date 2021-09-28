import {
    Scene, PerspectiveCamera, WebGLRenderer,
    BoxGeometry, MeshBasicMaterial, Mesh,
    AxesHelper, PlaneGeometry, PointLight,
    MeshPhongMaterial, MeshLambertMaterial,
    MOUSE,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new Scene();

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10) // 相機位置
camera.lookAt(scene.position) // 相機焦點

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new BoxGeometry();
const material = new MeshPhongMaterial({ color: 0x00ff00 });
const cube = new Mesh(geometry, material);
cube.position.set(0, 0, 0);
scene.add(cube);

const planeGeometry = new PlaneGeometry(60, 60)
const planeMaterial = new MeshLambertMaterial({ color: 0xffffff })
const plane = new Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -0.5 * Math.PI
plane.position.set(0, -1, 0)
scene.add(plane)

let pointLight = new PointLight(0xffffff)
pointLight.position.set(10, 10, -10)
scene.add(pointLight)

const controls = new OrbitControls( camera, renderer.domElement );
controls.mouseButtons = {
    RIGHT: MOUSE.ROTATE,
	MIDDLE: MOUSE.DOLLY,
}

const axes = new AxesHelper(20)
scene.add(axes)

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();