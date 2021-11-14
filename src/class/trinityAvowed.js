import {
  BoxGeometry, Group, Mesh,
  MeshBasicMaterial,
  Vector3,
} from 'three';

const WHITE = 0xffffff;
const BLUE = 0x0000ff;
const RED = 0xff0000;

class TrinityAvowed {
  /**
   *
   * @param {import('./globalController').default} globalController
   */
  constructor(globalController) {
    this.globalController = globalController;
    this.instance = null;

    this.init();
  }

  init = () => {
    const geometry = new BoxGeometry(1, 4, 1);
    const cubeA = new Mesh(geometry, new MeshBasicMaterial({ color: WHITE }));
    const cubeB = new Mesh(geometry, new MeshBasicMaterial({ color: BLUE })); 

    const group = new Group();
    group.add(cubeA);
    group.add(cubeB);
    group.position.set(3, 1.5, 3);
    cubeA.position.set(0, 0, 1);

    this.instance = group;
    window.group=group;
  }
}

export default TrinityAvowed;