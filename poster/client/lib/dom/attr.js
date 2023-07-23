import { newError, typeError } from "../error/index.js";
import { getNode } from "./getNode.js";
import { isString } from "./typeOf.js";

export function setAttr(node, prop, value) {
  if (isString(node)) node = getNode(node);
  if (!(isString(prop))) typeError("setAttr 함수의 두 번째 인수는 문자 타입 이어야 합니다.");
  if (!prop || !value) newError("setAttr 함수의 두 번째, 세 번째 인수는 필수 값 이어야 합니다.");
  node.setAttribute(prop, value);
}