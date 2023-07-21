/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

// ^ 함수 정의
function getNode(node) {
  if (typeof node !== 'string') {
    throw new Error('getNode 함수의 인수는 문자 타입 이어야 합니다.');
  }

  return document.querySelector(node);
}

function addClass(node, className) {
  if (typeof node === 'string') node = getNode(node);
  if (typeof node !== 'string') {
    throw new Error('getNode 함수의 인수는 문자 타입 이어야 합니다.');
  }
  node.classList.add(className)
}

// function removeClass(node, className) {
//   if (typeof node === 'string') node = getNode(node);
//   if (!className) {
//     node.className = '';
//     return;
//   }
//   node.classList.remove(className);
// }

// ^ 함수 생성
// ^ 2. nav 클릭시 배경 색상 변경 => setBgColor

// const setBgColor = (node, index) => {
//   node = getNode(node)
//   const {color} = data[index-1];
//   const [colorA, colorB] = color;
//   node.style.background = `linear-gradient(to bottom, ${colorA},${colorB})`;
// }

/*  getNode(
  "body"
).style.background = `linear-gradient(to bottom, ${colorA},${colorB})`; */

// 변수 선언
const container = getNode(".container");
const list = [...getNode(".nav ul").children];
const nickName = getNode(".nickName");
const visualImage = getNode(".visual img");
let currentAudio = null; // $ 이전에 재생 중이던 오디오를 추적하기 위한 변수

// event
function handleSlider(e) {
  e.preventDefault();
  // li 요소 찾기
  let target = e.target.closest("li");

  if (!target) return;

  // is-active 클래스 부여하기
  list.forEach((li) => li.classList.remove("is-active"));

  addClass(target, "is-active");

  // 이미지
  const index = target.dataset.index;
  const data = data[index-1];
  const {color} = data;
  const [colorA, colorB] = color;

  // ^ 배경색 변경하기: 2. nav 클릭시 배경 색상 변경 => setBgColor
  getNode(
    "body"
  ).style.background = `linear-gradient(to bottom, ${colorA},${colorB})`;
  // setBgColor("body", index);

  // 이름 변경
  nickName.textContent = data[index - 1].name;

  // ^ 이미지 변경: 3. 이미지 변경 => setImage
  visualImage.setAttribute("src", `./assets/${data[index - 1].name.toLowerCase()}.jpeg`);
  // ^ 4. 텍스트 변경 => setNameText
  visualImage.setAttribute("alt", data[index - 1].alt);

  // ^ +. 오디오 재생 => setAudio

  // $ 이전에 재생 중이던 오디오가 있으면 정지
  if (currentAudio) {
    currentAudio.pause();
  }

  const audio = new Audio(`/poster/client/assets/audio/${data[index - 1].name.toLowerCase()}.m4a`);
  // 이전에 재생 중이던 오디오가 있을시 중지
  audio.volume = 0.5; // 음량 설정
  audio.play();   // 재생

  // $ 현재 재생 중인 오디오 업데이트
  currentAudio = audio;
}

// ^ 이벤트 위임: 1. 클릭 이벤트 활성화
container.addEventListener("click", handleSlider);