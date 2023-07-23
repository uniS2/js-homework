import { newError, typeError } from "../error/index.js";
import { getNode } from "./getNode.js";
import { isString } from "./typeOf.js";
export { addClass, removeClass };

function addClass(node, className) {
  if(isString(node)) node = getNode(node);
  if(!className) newError('addClass 함수의 두 번째 인수는 필수 값 이어야 합니다.');
  node.classList.add(className);
}

function removeClass(node, className) {
  if (isString(node)) node = getNode(node);
  if (!className) {
    node.className = "";
    return;
  }
  if(!className) newError('addClass 함수의 두 번째 인수는 필수 값 이어야 합니다.');
  node.classList.remove(className);
}