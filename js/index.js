document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const inputTel = document.querySelector("#phone");
  const inputName = document.querySelector("#name");
  const inputContainer = document.querySelector(".form__item-group_tel");
  const btnSubmit = document.querySelector('.form__btn');


  const iti = window.intlTelInput(inputTel, {
    utilsScript: './js/intl-tel-input-17.0.0/build/js/utils.js',
    autoPlaceholder: 'aggressive',
    customContainer: 'form__input_tel',
    initialCountry: 'ru',
    dropdownContainer: inputContainer
  });

  // валидация формы
  function isValid(inputName, inputTel) {
    const regexpName = /^[a-zA-ZА-Яа-яЁё\s]+$/g;
    regexpName.lastIndex = 0;

    if ((inputName.value.trim() && regexpName.test(inputName.value) && inputName.value.length > 1)
      && (inputTel.value.trim() && iti.isValidNumber() && inputTel.value.length > 0)) {
      return true;
    } else {
      return false;
    }
  }

  form.addEventListener('input', () => {
    if (isValid(inputName, inputTel)) {
      btnSubmit.disabled = false;
      btnSubmit.classList.remove('form__btn_disabled');
    } else {
      btnSubmit.disabled = true;
      btnSubmit.classList.add('form__btn_disabled');
    }
  })
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    form.reset();
    alert('Форма отправлена.')
  })

  // отображение буквенного кода страны
  const flagContainer = document.querySelector(".iti__flag-container");
  const contryCodeNode = document.createElement('div');
  contryCodeNode.innerText = 'ru';
  contryCodeNode.className = 'form__input_code';
  flagContainer.prepend(contryCodeNode)

  inputTel.addEventListener("countrychange", () => {
    const countryLetterCode = iti.getSelectedCountryData().iso2;
    contryCodeNode.innerText = countryLetterCode ? countryLetterCode : '';
  })

})
