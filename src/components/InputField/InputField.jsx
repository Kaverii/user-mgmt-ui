import React from 'react';
import './InputField.scss';

function InputField({
  id,
  label,
  inputType = 'text',
  initialValue,
  isRequired,
  errorMsg,
  onChange,
  onBlur,
}) {
  const changeHandler = (event) => {
    onChange(event.target.value);
  };

  const blurHandler = (event) => {
    if (onBlur) {
      onBlur(event.target.value);
    }
  };

  return (
    <div className="input-field-wrap">
      <label htmlFor={id}>
        {label}
        {isRequired ? <span className="asterisks">*</span> : ''}
      </label>
      <input
        type={inputType}
        id={id}
        value={initialValue}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
      {errorMsg ? <div className="error-msg">{errorMsg}</div> : null}
    </div>
  );
}

export default InputField;
