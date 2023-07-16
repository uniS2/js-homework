# 네이버 로그인 페이지 구현   
   
---   
## 특징
로그인과 비밀번호를 정확히 입력했을 때 welcome 페이지로 넘어갈 수 있도록 코드 로직을 작성한다.
   
   
---
### 목표
- [x] 재사용 가능한 함수를 분리하고 함수를 중심으로 설계하는 방법에 대해 학습합니다.   
   

---   
## 설명
[email(id)과 pw 정규표현식을 이용한 is--invalid 클래스 추가 함수]
```javascript
const loginEvent = (node, type, func) => {
  node.addEventListener(type, function(){
    func(this.value) ? this.classList.remove("is--invalid") : this.classList.add("is--invalid");
  })
}
```
1. 함수 `emailReg`, `pwReg`
: email 과 pw 정규표현식을 사용하여 input 값과 일치할 경우에는 true 값을, 일치하지 않을 경우에는 false 값을 반환한다.
2. `loginEvent`
: (화살표) 함수 표현식을 사용하여 할당하며 `node`, `type`, `func` 매개변수를 지정한다.   
실행된 `func(this.value)`의 값이 true 일 경우 is--invalid 클래스를 제거하며, false일 경우 추가한다.
  - `node` : 이벤트를 추가해 줄 대상
  - `type` : 실행할 이벤트
  - `func` : 함수 `emailReg`, `pwReg` 중 현재 `node`에 따라 실행할 함수   
   
[로그인 버튼 클릭시 페이지 이동 함수]
```javascript
const button = (node, type, page) => {
  node = document.querySelector(node);
  
  node.addEventListener(type, function(event){
    event.preventDefault();
    (email.value === user.id && pw.value === user.pw) ? (window.location.href = page) : alert ("로그인 정보를 다시 확인해주세요");
  })
}
```
1. `button`
: (화살표) 함수 표현식을 사용하여 할당하며 `node`, `type`, `page` 매개변수를 지정한다.   
user 객체의 id, pw 값과 input에 넣어준 id, pw 값이 동일할 경우 `page`에 전달된 인자값으로 이동한다.
  - `node` : 이벤트를 추가해 줄 대상
  - `type` : 실행할 이벤트
  - `page` : user 객체의 id, pw 값과 input에 넣어준 id, pw 값이 동일할 경우 이동할 페이지  
  - `event.preventDefault()` : form 안의 button이 submit 상태이기 때문에 일어나는 이벤트 동작 이슈를 방지한다.   
   
[실행]  
```javascript
const email = document.querySelector('.user-email-input');
const pw = document.querySelector('.user-password-input');

loginEvent(email, 'input', emailReg);
loginEvent(pw, 'input', pwReg);
button('.btn-login', 'click', 'welcome.html');
``` 
- 이메일, 패스워드 변수를 지정하여 `loginEvent`, `button`에 각각 사용할 수 있도록 한다.