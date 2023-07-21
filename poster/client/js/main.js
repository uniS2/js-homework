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
const setRemoveAllClass = (node, className) => {
  if (typeof node === "string") node = getNode(node);
  if (!className) {
    node.className = "";
    return;
  }
  node.forEach((node) => node.classList.remove(className));
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
  visualImage.setAttribute("src", `./assets/${srcName.toLowerCase()}.jpeg`);
  visualImage.setAttribute("alt", alt);
};

// 4. 텍스트 변경 => setNameText
const setNameText = (title) => {
  if (typeof node === "string") node = getNode(node);
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
