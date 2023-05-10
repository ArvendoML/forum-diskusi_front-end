import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

const Input = ({
  label,
  type,
  name,
  placeholder,
  onChange,
  defaultValue,
  value,
  disabled,
}) => {
  return (
    <div className="form-input">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        required
      />
    </div>
  );
};

const InputPassword = ({ label, name, onChange }) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const handleOnClickShowPassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="form-input">
      <label>{label}</label>
      <div className="form-input-with-icon">
        <input
          type={passwordShown ? "text" : "password"}
          name={name}
          onChange={onChange}
          autoComplete="on"
          required
        />
        {passwordShown ? (
          <BiShow onClick={handleOnClickShowPassword} />
        ) : (
          <BiHide onClick={handleOnClickShowPassword} />
        )}
      </div>
    </div>
  );
};

export { Input, InputPassword };
