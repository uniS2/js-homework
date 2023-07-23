# 엘리멘탈 포스터 슬라이더   
   
두 번째 과제 (Elemental poster Slider)  
   
## 소개   
<p align="center">
  <img src="C:\Users\soixp\like-lion\js-homework\poster\client\assets\Elemental Movie Poster.mp4">
</p>
   
메뉴의 엘리멘탈 포스터를 클릭했을 때 화면에 배경 색상, 메인 비주얼 및 비주얼 오디오 등 해당하는 포스터의 정보를 나타낼 수 있도록 코드 로직을 작성한다.   
   
## 주요 기능   
- 클릭 이벤트 활성화
  - 이벤트 위임과 반복문
   
- nav의 각 `li` 항목 클릭시 (데이터는 `data.js` 의 `data` 객체 사용) 
  - 배경 색상 변경
   
  - 메인 비주얼 이미지 변경 : 경로 및 대체 텍스트 변경
   
  - 상단 텍스트 변경 : 비주얼에 맞는 상단 텍스트로 변경   
   
- 오디오 재생 : nav 하위의 각 `li` 항목 클릭시 비주얼에 맞는 오디오로 변경   
   
- 유틸 함수 (`lib` 디렉토리)
  - `dom` 디렉토리 : DOM 조작을 편리하게 해주는 디렉토리
  -  `error` 디렉토리 : error 발생을 편리하게 해주는 디렉토리

## 목차
- [유틸 함수](#유틸-함수)
  - [dom](#dom)
  - [error](#error)
- [main.js](#mainjs)
  - [클릭 이벤트 활성화](#클릭-이벤트-활성화)
  - [nav 클릭시 변경 사항](#nav-클릭시--해당하는-비주얼-정보-화면에-출력하기)
- [오디오 재생](#오디오-변경--비주얼에-맞는-오디오로-변경)
  - [오디오 재생 활성화](#오디오-재생-활성화--setaudio-사용자-정의-함수)
  - [audio.js](#audioplayer-클래스-추가-사항)

## 설명

### 유틸 함수
#### dom
##### export

```javascript
// lib/dom/index.js
export * from './attr.js'
export * from './css.js'
export * from './getNode.js'
export * from './typeOf.js'
```
- `lib` 디렉토리 안에 DOM 조작을 편리하게 해주는 유틸 함수를 모아놓은 `dom` 디렉토리를 생성한다.
- `dom` 디렉토리 내부의 `index.js` 파일을 통해 한번에 `export` 해준다.
  
##### typeOf.js
```javascript
function typeOf(data){
  return Object.prototype.toString.call(data).slice(8,-1).toLowerCase(); }

export const isString = (data) => typeOf(data) === "string";
```
- `typeOf(data)`
  - `Object`의 `toString` 기능을 빌려 매개변수 `data`의 타입값을 반환한다.
  - `export` 해주지 않았기 때문에 `isString` 유틸 함수의 data의 타입 값을 반환하는 용도로 사용한다.
- `isString(data)`
  - 매개변수 `data`가 문자일 경우 `true` 를, 문자가 아닐 경우 `false`를 반환하는 함수다.

##### getNode.js
```javascript
export function getNode(node) {
  if (!(isString(node))) typeError("getNode 함수의 인수는 문자 타입 이어야 합니다.");
  return document.querySelector(node); }
```
- `getNode(node)`
  - 매개변수 `node`에 해당하는 선택자를 찾아 해당하는 요소를 반환하는 함수다.
   - 매개변수 `node`가 문자가 아닐 경우 `typeError` 유틸함수에 의해 "getNode 함수의 인수는 문자 타입 이어야 합니다." 라는 `TypeError` 가 발생하고 함수를 종료한다.

##### attr.js
```javascript
export function setAttr(node, prop, value) {
  if (isString(node)) node = getNode(node);
  if (!(isString(prop))) typeError("setAttr 함수의 두 번째 인수는 문자 타입 이어야 합니다.");
  if (!prop || !value) newError("setAttr 함수의 두 번째, 세 번째 인수는 필수 값 이어야 합니다.");
  node.setAttribute(prop, value); }
```
- `setAttr(node, prop, value)`
  - 매개변수 `node`에 해당하는 요소의 속성값(매개변수 `prop`)을 매개변수 `value`의 값으로 바꾸는 함수다.
  - 매개변수 `node`가 문자일 경우 `getNode(node)` 값으로 정한다.
  - 매개변수 `prop`가 문자가 아닐 경우 `typeError` 유틸함수에 의해 "setAttr 함수의 두 번째 인수는 문자 타입 이어야 합니다." 라는 `TypeError` 가 발생하고 함수를 종료한다.
  - 매개변수 `prop` 또는 `value`의 값이 없을 경우 `newError` 유틸함수에 의해 "setAttr 함수의 두 번째, 세 번째 인수는 필수 값 이어야 합니다." 라는 `Error` 가 발생하고 함수를 종료한다.

##### css.js
```javascript
export { addClass, removeClass };

// addClass
function addClass(node, className) {
  if(isString(node)) node = getNode(node);
  if(!className) newError('addClass 함수의 두 번째 인수는 필수 값 이어야 합니다.');
  node.classList.add(className); }

// removeClass
function removeClass(node, className) {
  if (isString(node)) node = getNode(node);
  if (!className) {
    node.className = "";
    return; }
  if(!className) newError('addClass 함수의 두 번째 인수는 필수 값 이어야 합니다.');
  node.classList.remove(className); }
```
- `addClass(node, className)`
  - 매개변수 `node`에 해당하는 요소의 `class`에 매개변수 `className`을 `add` 하는 함수다.
  - 매개변수 `node`가 문자일 경우 `getNode(node)` 값으로 정한다.
  - 매개변수 `className`가 문자가 아닐 경우 `newError` 유틸함수에 의해 'addClass 함수의 두 번째 인수는 필수 값 이어야 합니다.' 라는 `Error` 가 발생하고 함수를 종료한다.
- `removeClass(node, className)`
  - 매개변수 `node`에 해당하는 요소의 `class`에 매개변수 `className`을 `remove` 하는 함수다.
  - 매개변수 `node`가 문자일 경우 `getNode(node)` 값으로 정한다.
  - 매개변수 `className`이 문자가 아닐 경우 빈 문자열을 반환하고 함수를 종료한다.
  - 매개변수 `className`의 값이 없을 경우 `newError` 유틸함수에 의해 "addClass 함수의 두 번째 인수는 필수 값 이어야 합니다." 라는 `Error` 가 발생하고 함수를 종료한다.

[목차로 이동](#목차)

#### error
##### export
```javascript
// lib/error/index.js
export * from './newError.js';
export * from './typeError.js';
```
- `lib` 디렉토리 안에 error를 발생하는 유틸 함수를 모아놓은 `error` 디렉토리를 생성한다.
- `error` 디렉토리 내부의 `index.js` 파일을 통해 한번에 `export` 해준다.
  
##### TypeError 발생 함수
```javascript
export function typeError(message){
  if(!(isString(message))){
    throw new TypeError("typeError 함수의 인수는 문자 타입 이어야 합니다.")
  }
  throw new TypeError(message) }
```
- `typeError(message)`
  - 매개변수 `message`의 내용을 가지는 `TypeError` 를 발생시키고 함수를 종료하는 함수다.
  - 매개변수 `message`가 문자가 아닐 경우 "typeError 함수의 인수는 문자 타입 이어야 합니다." 라는 `TypeError` 가 발생하고 함수를 종료한다.

##### Error 발생함수
```javascript
export function newError(message){
  if(!(isString(message))) typeError("newError 함수의 인수는 문자 타입 이어야 합니다.")
  throw new Error(message); }
```
- `newError(message)`
  - 매개변수 `message`의 내용을 가지는 `Error` 를 발생시키고 함수를 종료하는 함수다.
  - 매개변수 `message`가 문자가 아닐 경우 유틸함수 `typeError`에 의해 "newError 함수의 인수는 문자 타입 이어야 합니다." 라는 `TypeError` 가 발생하고 함수를 종료한다.

[목차로 이동](#목차)

### main.js
#### 클릭 이벤트 활성화
##### 이벤트 위임
```javascript
// 변수 선언
const container = getNode(".container");

// eventStart()
const eventStart = () => {
  container.addEventListener("click", handleSlider); };

eventStart();
```
- 실행 함수 `eventStart()`를 생성하여 함수 내부에서 `addEventListener` 가 동작한다.
- `getNode` 유틸함수를 사용하여 `container` 클래스를 가지는 요소를 반환한다.
- 상위 요소 `container`에 `addEventListener()` 메서드를 사용하여, `container` 클래스를 가지는 요소에 `click` 이벤트가 실행될 때마다 `handleSlider` 핸들러가 동작하도록 설정한다.

##### 반복문 : 비주얼 요소 찾기 및 이벤트 활성화
```javascript
let target = e.target.closest("li");
if (!target) return;
```
- `target` 속성과 `closest` 메서드를 사용하여 클릭 이벤트가 발생한 대상 중 주어진 선택자 `li`와 일치하는 가까운 요소를 반환하도록 한다.
- 클릭 이벤트가 발생한 대상에 `li` 선택자와 가까운 요소가 없어 `null` 값을 반환시 함수를 종료한다.
- 사용자 정의 함수 `setRemoveAllClass`, `setClass`를 사용하여 비주얼 요소를 찾는다.
  ```javascript
  // setRemoveAllClass
  const setRemoveAllClass = (node, className) => {
    if (isString(node)) node = getNode(node);
    if (!className) {
      node.className = "";
      return; }
    node.forEach((node) => removeClass(node, className)); };

  // setClass
  const setClass = (removeNode, addNode, className) => {
    setRemoveAllClass(removeNode, className);
    addClass(addNode, className); };

  // handleSlider
  const list = [...getNode(".nav ul").children];
  setClass(list, target, "is-active");
  ```
  - `setRemoveAllClass(node, className)`
    - 클릭했던 비주얼 이미지(`li`) 요소에 남게 된, 추가해주었던 `class` 이름을 `forEach` 반복문을 통해 모두 제거하는 역할을 한다.
    - 매개변수 `node` 값이 문자열일 경우 `getNode` 유틸함수를 통해 해당 요소를 반환한다.
    - 매개변수 `className` 값이 없을 경우 빈 문자열을 넣어주고 함수를 종료한다.
  - `setClass(removeNode, addNode, className)`
    - `setRemoveAllClass`, `addClass` 함수를 사용하여 선택한 비주얼 이미지 요소에만 이벤트를 활성화하는 역할을 한다. (`border` 설정)
  - `children` 프로퍼티를 사용하여 `nav` 클래스를 가지는 요소의 `ul` 하위 요소의 자식 요소들을 모두 찾아 배열로 반환한다. 

#### nav 클릭시 : 해당하는 비주얼 정보 화면에 출력하기
##### 데이터 : `data.js` 의 `data` 객체 사용
- 사용자 정의 함수 `setIndex(target)`을 활용하여 각 `index` 값에 맞는 객체 `data`의 `color`, `name`, `alt` 정보를 반환한다.
- 객체 구조 분해 할당을 사용하여 `color`, `name`, `alt` 변수로 분리한다.
  ```javascript
  const { color, name, alt } = data[setIndex(target)];
  ```
- `setIndex(node)`
  - 매개변수 `node`에 해당하는 요소의 `index`를 구하는 사용자 정의 함수를 사용한다.
  - `dataset` 프로퍼티를 사용하여 `li` 요소에 있는 `data-index` 속성을 찾아 1 빼준 값을 반환한다.
  ```javascript
  const setIndex = (node) => (node.dataset.index - 1);
  ```

##### 배경 색상 변경 
- `setBgColor(color)` 사용자 정의 함수를 사용하여 변경한다.
  ```javascript
  // setBgColor
  const setBgColor = (color) => {
  const body = getNode("body");
  const [colorA, colorB] = color; // ex) color: ["#ff6a00", "#720400"]
  body.style.background = `linear-gradient(to bottom, ${colorA},${colorB})`; };

  // handleSlider
  setBgColor(color);
  ```
  - 인수로 데이터의 색깔 정보를 가지고 있는 변수 `color` 를 받아, body 요소의 `background` 속성값을 `linear-gradient(to bottom, ${colorA},${colorB})` 에 맞게 변경해주는 역할을 한다.
  - `body` 노드를 가지고 있는 요소를 찾아 변수 `body`에 할당한다.
  - 데이터의 색깔 정보를 가지고 있는 변수 `color`는 배열로 이루어져 있으므로, 값을 각각 사용하기 위해 `colorA`, `colorB`로 구조 분해 할당한다.
   
##### 메인 비주얼 이미지 변경 : 경로 및 대체 텍스트 변경
- `setImage` 사용자 정의 함수를 사용하여 변경한다.
  ```javascript
  // setImage
  const setImage = (srcName, alt) => {
  const visualImage = getNode(".visual img");
  setAttr(visualImage, "src", `./assets/${srcName.toLowerCase()}.jpeg`);
  setAttr(visualImage, "alt", alt); };

  // handleSlider
  setImage(name, alt);
  ```
  - 인수로 데이터의 이름과 대체 텍스트 정보를 가지고 있는 변수 `name`, `alt` 를 받아, `visual` 클래스 하위 `img` 요소의 `src` 속성값을 `./assets/${srcName.toLowerCase()}.jpeg` 로, `alt` 속성값을 `alt` 에 맞게 변경해주는 역할을 한다.
  - `visual` 클래스 하위 `img` 요소를 찾아 변수 `visualImage`에 할당한다.
  - 사용자 정의 함수 `setAttr` 를 사용하여 선택한 비주얼 이미지에 맞게 이미지 경로와 대체 텍스트를 변경해준다.
   
##### 상단 텍스트 변경 : 비주얼에 맞는 상단 텍스트로 변경
- `setNameText(title)` 사용자 정의 함수를 사용하여 변경한다.
  ```javascript
  // setImage
  const setNameText = (title) => {
  const nickName = getNode(".nickName");
  nickName.textContent = title; };

  // handleSlider
  setNameText(name);
  ```
  - 인수로 데이터의 이름을 가지고 있는 변수 `name`을 받아, `nickName` 클래스 요소의 콘텐트를 변경해주는 역할을 한다.
  - `nickName` 클래스를 가지고 있는 요소를 찾아 변수 `nickName`에 할당한다.
  - `textContent` 속성을 사용하여 선택한 비주얼 이미지에 맞게 상단 텍스트를 변경해준다.

[목차로 이동](#목차)  
   
#### 오디오 변경 : 비주얼에 맞는 오디오로 변경  
- `audio.js` 파일의 `AudioPlayer` 클래스를 사용하여 오디오 객체를 생성한다.
- `setAudio(srcName, volume)` 사용자 정의 함수를 사용하여 변경한다.

##### 오디오 재생 활성화 : setAudio 사용자 정의 함수
  ```javascript
  // setAudio
  const setAudio = (srcName, volume) => {
  if (currentAudio) {
    if (currentAudio.isPlaying()) {
      currentAudio.stop();
    } }

  let source = `/poster/client/assets/audio/${srcName.toLowerCase()}.m4a`;
  const playAudio = new AudioPlayer(source);

  playAudio.volume = volume;
  playAudio.play();

  currentAudio = playAudio; };

  // handleSlider
  let currentAudio = null;
  setAudio(name, 0.5);
  ```
  - 인수로 데이터의 이름을 가지고 있는 `name`과 설정하는 `volume` 값을 받아, 현재 재생 중인 오디오 `currentAudio`를 멈추고 새로운 오디오 `playAudio`를 재생하는 역할을 한다.
  - 현재 재생되는 오디오를 담아주는 `currentAudio` 객체를 생성하여 다른 비주얼 이미지가 클릭되어있을때도 재생중이라면 `isPlaying()` 메서드를 통해 재생 여부를 확인하고 `stop()` 메서드를 사용하여 재생을 중단한다.
  - 생성자 `source`를 `name` 변수를 활용하여 `/poster/client/assets/audio/${srcName.toLowerCase()}.m4a` 에 맞게 설정한 후, `AudioPlayer` 클래스를 활용하여 `playAudio` 오디오 객체를 생성한다.
  - `playAudio` 오디오 객체의 볼륨을 매개변수 `volume` 값으로 설정한다.
  - 새로운 오디오를 재생할 때마다 `currentAudio` 변수가 해당 오디오 객체로 업데이트되어 동시 재생을 중단하고 새로운 오디오를 재생하도록 한다.

##### audio.js : AudioPlayer 클래스 추가 사항
```javascript
set volume(volume) {
  if (volume < 0 || volume > 1) newError('볼륨은 0과 1 사이의 숫자이어야 합니다.');
  this.#audio.volume = volume;
}

get volume() {
  return this.#audio.volume; }
```
- `volume` 조절을 위해 각 함수를 설정해 주었다.
- `volume` 의 경우 0 에서 1 사이의 값을 가지므로, 해당하는 범위의 값을 넘어갈 경우 `newError` 유틸함수를 이용하여 '볼륨은 0과 1 사이의 숫자이어야 합니다.' 라는 Error 를 생성하고 함수를 종료하도록 하였다.


[목차로 이동](#목차)