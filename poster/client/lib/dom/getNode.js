import { typeError } from "../error/index.js";
import { isString } from "./typeOf.js";

export function getNode(node) {
  // if (!(isString(node))) typeError("getNode 함수의 인수는 문자 타입 이어야 합니다.");
  return document.querySelector(node);
}