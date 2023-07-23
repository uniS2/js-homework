import { isString } from "../dom/index.js";
import { typeError } from "./typeError.js";

export function newError(message){
  if(!(isString(message))) typeError("newError 함수의 인수는 문자 타입 이어야 합니다.")
  throw new Error(message);
}