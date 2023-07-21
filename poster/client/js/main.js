/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

// 유틸 함수
function getNode(node) {
  if (typeof node !== "string") {
    throw new Error("getNode 함수의 인수는 문자 타입 이어야 합니다.");
  }

  return document.querySelector(node);
}

function addClass(node, className) {
  if (typeof node === "string") node = getNode(node);
  node.classList.add(className);
}

function removeClass(node, className) {
  if (typeof node === "string") node = getNode(node);
  if (!className) {
    node.className = "";
    return;
  }
  node.classList.remove(className);
}

// 사용자함수 생성
// 1. 'is-active' 클래스 : 반복문
const setRemoveClass = (node, className) => {
  if (typeof node === "string") node = getNode(node);
  if (!className) {
    node.className = "";
    return;
  }
  node.forEach((node) => node.classList.remove(className));
}

const setClass = (removeNode, addNode, className) => {
  setRemoveClass(removeNode, className);
  addClass(addNode, className)
}

// 2. nav 클릭시 배경 색상 변경 => setBgColor
const setBgColor = (color) => {
  const body = getNode("body");
  const [colorA, colorB] = color;
  body.style.background = `linear-gradient(to bottom, ${colorA},${colorB})`;
};

// 3. 이미지 변경 => setImage
const setImage = (name) => {
  const visualImage = getNode(".visual img");
  visualImage.setAttribute("src", `./assets/${name.toLowerCase()}.jpeg`);
};

// 4. 텍스트 변경 => setNameText
const setNameText = (name) => {
  if (typeof node === "string") node = getNode(node);
  const nickName = getNode(".nickName");
  nickName.textContent = name;
};

// 대체첵스트 변경 -> setAlt
const setAlt = (alt) => {
  const visualImage = getNode(".visual img");
  visualImage.setAttribute("alt", alt);
};

// ? 오디오 재생
const setAudio = (name, volume) => {
  // $ 이전에 재생 중이던 오디오가 있으면 정지
  if (currentAudio) currentAudio.pause();

  const audio = new Audio(
    `/poster/client/assets/audio/${name.toLowerCase()}.m4a`
  );
  // 이전에 재생 중이던 오디오가 있을시 중지
  audio.volume = volume; // 음량 설정
  audio.play(); // 재생

  // $ 현재 재생 중인 오디오 업데이트
  currentAudio = audio;
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

  setClass(list, target, "is-active");

  const index = target.dataset.index - 1;
  const { color, name, alt } = data[index];

  setBgColor(color);

  setNameText(name);

  setImage(name);

  setAlt(alt);

  setAudio(name, 0.1);
}

// 이벤트 위임: 1. 클릭 이벤트 활성화
container.addEventListener("click", handleSlider);
