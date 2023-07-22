import { isString } from "../dom/index.js";

export function typeError(message){
  if(!isString(message)){
    throw new TypeError("typeError 함수의 인수는 문자 타입 이어야 합니다.")
  }
  throw new TypeError(message)
}