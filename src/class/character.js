import {
  BoxGeometry, Mesh,
  MeshPhongMaterial,
  Vector3,
} from 'three';

const MOVE_DELTA = 0.1;

class Character {
  /**
   *
   * @param {import('./globalController').default} globalController
   */
  constructor(globalController) {
    this.globalController = globalController;
    this.instance = null;
    this.moveFlag = {
      right: false,
      left: false,
      up: false,
      down: false,
    };

    this.init();
  }

  init = () => {
    const geometry = new BoxGeometry();
    const material = new MeshPhongMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    this.instance = cube;
    cube.position.set(0, 0, 0);

    document.addEventListener('keydown', this.handleKeyDownControl);
    document.addEventListener('keyup', this.handleKeyUpControl);
  }

  release = () => {
    document.removeEventListener('keydown', this.handleKeyDownControl);
    document.removeEventListener('keyup', this.handleKeyUpControl);
  }

  handleKeyDownControl = (event) => {
    const { keyCode } = event;
    if (keyCode === 87) { // w
      this.moveFlag.up = true;
    } else if (keyCode === 83) { // s
      this.moveFlag.down = true;
    } else if (keyCode === 65) { // a
      this.moveFlag.left = true;
    } else if (keyCode === 68) { // d
      this.moveFlag.right = true;
    }
  }

  handleKeyUpControl = (event) => {
    const { keyCode } = event;
    if (keyCode === 87) { // w
      this.moveFlag.up = false;
    } else if (keyCode === 83) { // s
      this.moveFlag.down = false;
    } else if (keyCode === 65) { // a
      this.moveFlag.left = false;
    } else if (keyCode === 68) { // d
      this.moveFlag.right = false;
    }
  }

  update = () => {
    const { camera } = this.globalController;
    const forward = new Vector3();
    camera.getWorldDirection(forward);
    forward.setY(0);
    const right = new Vector3().crossVectors(camera.up, forward);

    forward.normalize();
    right.normalize();

    if (this.moveFlag.up) {
      this.instance.position.addScaledVector(forward, 1 * MOVE_DELTA);
    }
    if (this.moveFlag.down) {
      this.instance.position.addScaledVector(forward, -1 * MOVE_DELTA);
    }
    if (this.moveFlag.right) {
      this.instance.position.addScaledVector(right, -1 * MOVE_DELTA);
    }
    if (this.moveFlag.left) {
      this.instance.position.addScaledVector(right, 1 * MOVE_DELTA);
    }
  }
}

export default Character;
