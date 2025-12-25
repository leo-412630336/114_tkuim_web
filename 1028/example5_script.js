const form = document.getElementById('full-form');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const agreeCheckbox = document.getElementById('agree');

function validateAllInputs(formElement) {
  let firstInvalid = null;
  const controls = Array.from(formElement.querySelectorAll('input, select, textarea'));
  controls.forEach((control) => {
    control.classList.remove('is-invalid');
    if (!control.checkValidity()) {
      control.classList.add('is-invalid');
      if (!firstInvalid) {
        firstInvalid = control;
      }
    }
  });
  return firstInvalid;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = '送出中...';

  const firstInvalid = validateAllInputs(form);
  if (firstInvalid) {
    submitBtn.disabled = false;
    submitBtn.textContent = '送出';
    firstInvalid.focus();
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  alert('資料已送出，感謝您的聯絡！');
  form.reset();
  submitBtn.disabled = false;
  submitBtn.textContent = '送出';
});

resetBtn.addEventListener('click', () => {
  form.reset();
  Array.from(form.elements).forEach((element) => {
    element.classList.remove('is-invalid');
  });
});

form.addEventListener('input', (event) => {
  const target = event.target;
  if (target.classList.contains('is-invalid') && target.checkValidity()) {
    target.classList.remove('is-invalid');
  }
});

agreeCheckbox.addEventListener('mousedown', (event) => {
  if (!agreeCheckbox.checked) {
    event.preventDefault();
    
    const confirmAgree = confirm('請確認您已閱讀並同意隱私權條款，是否確定？');
    
    if (confirmAgree) {
      agreeCheckbox.checked = true;
            const changeEvent = new Event('change', { bubbles: true });
      agreeCheckbox.dispatchEvent(changeEvent);
    }
  } else {
    event.preventDefault();
    agreeCheckbox.checked = false;
    
    const changeEvent = new Event('change', { bubbles: true });
    agreeCheckbox.dispatchEvent(changeEvent);
  }
});

agreeCheckbox.addEventListener('keydown', (event) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    
    if (!agreeCheckbox.checked) {
      const confirmAgree = confirm('請確認您已閱讀並同意隱私權條款，是否確定？');
      if (confirmAgree) {
        agreeCheckbox.checked = true;
        const changeEvent = new Event('change', { bubbles: true });
        agreeCheckbox.dispatchEvent(changeEvent);
      }
    } else {
      agreeCheckbox.checked = false;
      const changeEvent = new Event('change', { bubbles: true });
      agreeCheckbox.dispatchEvent(changeEvent);
    }
  }
});