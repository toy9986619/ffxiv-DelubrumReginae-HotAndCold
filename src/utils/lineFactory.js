import {
  LineBasicMaterial, BufferGeometry, Line,
  Vector3,
} from 'three';

const material = new LineBasicMaterial({ color: 0x000000 });

const lineFactory = (pointA, pointB) => {
  const points = [];
  points.push(new Vector3(...pointA));
  points.push(new Vector3(...pointB));

  const geometry = new BufferGeometry().setFromPoints(points);

  const line = new Line(geometry, material);

  return line;
};

export default lineFactory;
