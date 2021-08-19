import { Transform } from "../components/Transform";
import { GameObject } from "../GameObject";

/**
 * @returns {GameObject}
 */
export default function createCamera() {
  const obj = new GameObject();
  obj.addComponent(new Transform());
  return obj;
}