import React, { useState } from "react";

const Input = ({
  type,
  placeholder,
  onChange,
  name,
  label,
  leftIcon,
  className,
  pattern,
  value,
  errorMsg,
  required
}) => {
  const [isValid, setIsValid] = useState("s");

  const handleChange = (e) => {
    const value = e.target.value;
    setIsValid(value.length ? new RegExp(pattern).test(value) : false);
    onChange(e);
  };
  return (
    <div className={`form-group ${isValid ? '' : 'has-error'}`}>
    {label && <label className="label control-label">{label} :</label>}
    <div className="formInput">
      {leftIcon && <i className={`${leftIcon} ${value && (isValid ? 'valid' : 'invalid')}`}></i>}
      <input
        type={type}
        pattern={pattern}
        name={name}
        value={value}
        onChange={handleChange}
        className={`${className} ${leftIcon && 'leftIcon'} ${value && (isValid ? 'valid' : 'invalid')}`}
        placeholder={placeholder}
        required={required}
      ></input>
    </div>
    {/* {!value && <div className="error-message"><i className="fa-solid fa-triangle-exclamation"></i> {errorMsg} </div>} */}
  </div>
  );
};

export default Input;
