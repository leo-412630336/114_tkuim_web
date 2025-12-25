// example2_script.js
// 驗證 Email 與手機欄位，拋出自訂訊息後再提示使用者
const form = document.getElementById('contact-form');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
function isTkuEmail(value) {
  const tkuEmailPattern = /^[a-zA-Z0-9._%+-]+@o365\.tku\.edu\.tw$/;
  return tkuEmailPattern.test(value);
}

function showValidity(input) {
  if (input.validity.valueMissing) {
    input.setCustomValidity('這個欄位必填');
  } 
  else if (input === email) {
    if (!isTkuEmail(input.value)) {
      input.setCustomValidity('輸入淡江信箱@o365.tku.edu.tw');
    } else {
      input.setCustomValidity('');
    }
  }
  else if (input.validity.typeMismatch) {
    input.setCustomValidity('格式不正確');
  } 
  else if (input.validity.patternMismatch) {
    input.setCustomValidity(input.title || '格式不正確');
  } 
  else {
    input.setCustomValidity('');
  }

  return input.reportValidity(); 
}
form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const emailOk = showValidity(email);
  const phoneOk = showValidity(phone);
  
  if (emailOk && phoneOk) {
    alert('表單驗證成功，準備送出資料');
    form.reset();
  }
});
email.addEventListener('blur', () => {
  showValidity(email);
});
phone.addEventListener('blur', () => {
  showValidity(phone);
});
// 不要即時驗證
// email.addEventListener('blur', () => { showValidity(email); });
// phone.addEventListener('blur', () => { showValidity(phone); });