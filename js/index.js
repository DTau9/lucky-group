document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const inputTel = document.querySelector("#phone");
  const inputName = document.querySelector("#name");
  const inputContainer = document.querySelector(".form__item-group_tel");
  const btnSubmit = document.querySelector('.form__btn');


  const iti = window.intlTelInput(inputTel, {
    utilsScript: './js/intl-tel-input-17.0.0/build/js/utils.js',
    separateDialCode: true,
    customContainer: 'form__input_tel',
    initialCountry: 'ru',
    dropdownContainer: inputContainer
  });

  // валидация формы
  function isValidName(inputName) {
    const regexpName = /^[a-zA-ZА-Яа-яЁё\s]+$/g;
    regexpName.lastIndex = 0;
    return Boolean(inputName.value.trim() && regexpName.test(inputName.value) && inputName.value.length > 1)
  }

  function isValidTel(inputTel) {
    return Boolean(inputTel.value.trim() && iti.isValidNumber() && inputTel.value.length > 0)
  }

  function formValidation() {
    if (isValidName(inputName)) {
      inputName.classList.remove('form__input_not-valid')
      inputName.classList.add('form__input_valid')
    } else {
      inputName.classList.remove('form__input_valid')
      inputName.classList.add('form__input_not-valid')
    }

    if (isValidTel(inputTel)) {
      inputTel.classList.remove('form__input_not-valid')
      inputTel.classList.add('form__input_valid')
    } else {
      inputTel.classList.remove('form__input_valid')
      inputTel.classList.add('form__input_not-valid')
    }

    if (isValidName(inputName) && isValidTel(inputTel)) {
      btnSubmit.disabled = false;
      btnSubmit.classList.remove('form__btn_disabled');
    } else {
      btnSubmit.disabled = true;
      btnSubmit.classList.add('form__btn_disabled');
    }
  }

  form.addEventListener('input', formValidation)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    form.reset();
    alert('Форма отправлена.')
  })

  // отображение буквенного и цифрового кода страны
  const flagContainer = document.querySelector(".iti__flag-container");
  const contryLetterCodeNode = document.createElement('div');
  const contryDialCodeNode = document.createElement('div');
  contryLetterCodeNode.innerText = 'ru';
  contryDialCodeNode.innerText = '+7';
  contryLetterCodeNode.className = 'form__input_code';
  contryDialCodeNode.className = 'dial-code';
  flagContainer.prepend(contryLetterCodeNode)
  inputContainer.prepend(contryDialCodeNode)

  inputTel.addEventListener("countrychange", () => {
    const countryLetterCode = iti.getSelectedCountryData().iso2;
    const countryDialCode = iti.getSelectedCountryData().dialCode;

    contryLetterCodeNode.innerText = countryLetterCode ? countryLetterCode : '';
    contryDialCodeNode.innerText = countryDialCode ? `+${countryDialCode}` : '';
  })

})
