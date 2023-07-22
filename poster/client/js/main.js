/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

import { AudioPlayer } from "./audio.js";
import { data } from "./data.js";
import { addClass, getNode, isString, removeClass, setAttr } from "../lib/dom/index.js";

// 사용자함수 생성
// 1. 'is-active' 클래스 : 반복문
const setRemoveAllClass = (node, className) => {
  if (isString(node)) node = getNode(node);
  if (!className) {
    node.className = "";
    return;
  }
  node.forEach((node) => removeClass(node, className));
};

const setClass = (removeNode, addNode, className) => {
  setRemoveAllClass(removeNode, className);
  addClass(addNode, className);
};

// index 구하기
const setIndex = (node) => {
  return node.dataset.index - 1;
};

// 2. nav 클릭시 배경 색상 변경 => setBgColor
const setBgColor = (color) => {
  const body = getNode("body");
  const [colorA, colorB] = color;
  body.style.background = `linear-gradient(to bottom, ${colorA},${colorB})`;
};

// 3. 이미지 및 대체텍스트 변경 => setImage
const setImage = (srcName, alt) => {
  const visualImage = getNode(".visual img");
  setAttr(visualImage, "src", `./assets/${srcName.toLowerCase()}.jpeg`);
  setAttr(visualImage, "alt", alt);
};

// 4. 텍스트 변경 => setNameText
const setNameText = (title) => {
  if (isString(node)) node = getNode(node);
  const nickName = getNode(".nickName");
  nickName.textContent = title;
};

// 오디오 재생
const setAudio = (srcName, volume) => {
  // 이전에 재생 중이던 오디오가 있으면 정지
  if (currentAudio) {
    if (currentAudio.isPlaying()) {
      currentAudio.stop();
    }
  }

  source = `/poster/client/assets/audio/${srcName.toLowerCase()}.m4a`;
  const playAudio = new AudioPlayer(source);

  playAudio.volume = volume;
  playAudio.play();

  //  현재 재생 중인 오디오 업데이트
  currentAudio = playAudio;
};

// 변수 선언
const container = getNode(".container");
const list = [...getNode(".nav ul").children];
let currentAudio = null; // $ 이전에 재생 중이던 오디오를 추적하기 위한 변수

// event
function handleSlider(e) {
  e.preventDefault();

  let target = e.target.closest("li");
  if (!target) return;

  const { color, name, alt } = data[setIndex(target)];

  setClass(list, target, "is-active");

  setBgColor(color);

  setNameText(name);

  setImage(name, alt);

  setAudio(name, 1);

  // * volume 조절할 수 있도록
}

// 이벤트 위임: 1. 클릭 이벤트 활성화
const eventStart = () => {
  container.addEventListener("click", handleSlider);
};

eventStart();
