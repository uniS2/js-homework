const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

let emailInput = document.querySelector(".user-email-input");
let pwInput = document.querySelector(".user-password-input");
let button = document.querySelector(".btn-login")

// function emailEvent(node, event) {
//   if (emailReg(node.value)){
//     node.classList.remove(event);
//   } else {
//     node.classList.add(event);
//   }
// }

emailInput.addEventListener("input", () => {
  emailReg(emailInput.value) ? emailInput.classList.remove("is--invalid") : emailInput.classList.add("is--invalid");
});

// emailInput.addEventListener("input", emailEvent(emailInput, "is--invalid"));

pwInput.addEventListener("input", () => {
  pwReg(pwInput.value) ? pwInput.classList.remove("is--invalid") : pwInput.classList.add("is--invalid");
});

button.addEventListener("click", (e) => {
  e.preventDefault();  // 비밀번호가 틀려도 button의 submit의  이벤트가 작동
  if (emailInput.value === user.id && pwInput.value === user.pw){ window.location.href = 'welcome.html' };
})
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