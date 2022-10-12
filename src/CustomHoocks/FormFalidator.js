/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import validator from 'validator/';

const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isEmail, setIsEmail] = useState(false);
  const [minLength, setMinLength] = useState(false);
  const [maxLength, setMaxLength] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const errText = (minLength ? `Минимум ${validations.minLength} символа. ` : '')
    + (maxLength ? `Максимум ${validations.maxLength} символов. ` : '')
    + (isEmpty ? 'Не может быть пустым. ' : '')
    + (isEmail ? 'Не Email. ' : ''
    );

  // проверка вадиности полей формы
  const checkValidInput = () => {
    for (const validation in validations) {
      if (Object.hasOwnProperty.call(validations, validation)) {
        switch (validation) {
          case 'minLength':
            if (value.length < validations[validation]) {
              setMinLength(true);
            } else {
              setMinLength(false);
            }
            break;
          case 'maxLength':
            if (value.length > validations[validation]) {
              setMaxLength(true);
            } else {
              setMaxLength(false);
            }
            break;
            // проверка на заполненость поля
          case 'isEmpty':
            if (value) {
              setIsEmpty(false);
            } else {
              setIsEmpty(true);
            }
            break;
            // проверка на ссответвие шаблону почты
          case 'isEmail':
            if (validator.isEmail(value)) {
              setIsEmail(false);
            } else {
              setIsEmail(true);
            }
            break;
        }
      }
    }
  };
  // проверка вадиности формы
  const checkValidForm = () => {
    if (isEmpty || isEmail || minLength || maxLength) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  };
  useEffect(() => {
    checkValidInput();
  }, [value]);
  useEffect(() => {
    checkValidForm();
  }, [isEmpty, isEmail, minLength, maxLength]);
  return {
    isEmpty,
    isEmail,
    minLength,
    maxLength,
    inputValid,
    errText,
  };
};

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onFocus = () => {
    setIsDirty(true);
  };
  return {
    value,
    onChange,
    onFocus,
    isDirty,
    ...valid,
    setValue,
  };
};

export default useInput;
