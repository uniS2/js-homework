const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

// email, pw 정규표현식을 사용한 validation -> is--invalid 추가시 에러메세지

const loginEvent = (node, type, func) => {
  node.addEventListener(type, function(){
    func(this.value) ? this.classList.remove("is--invalid") : this.classList.add("is--invalid");
  })
}

// 로그인 버튼을 클릭시 조건처리

const button = (node, type, page) => {
  node = document.querySelector(node);
  
  node.addEventListener(type, function(event){
    event.preventDefault(); // form 안의 button이 submit이어서 비밀번호가 틀려도 action 페이지로 이동 (이벤트 동작)
    (email.value === user.id && pw.value === user.pw) ? (window.location.href = page) : alert ("로그인 정보를 다시 확인해주세요");
  })
}

// 실행

// 이메일, 패스워드 지정
const email = document.querySelector('.user-email-input');
const pw = document.querySelector('.user-password-input');

loginEvent(email, 'input', emailReg);
loginEvent(pw, 'input', pwReg);
button('.btn-login', 'click', 'welcome.html');

/*

1. email 정규표현식을 사용한 validation -> is--invalid 추가시 에러메세지
2. pw 정규표현식을 사용한 validation  -> is--invalid 추가시 에러메세지
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/

function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{10,16}$/;
  return re.test(String(text).toLowerCase());
}