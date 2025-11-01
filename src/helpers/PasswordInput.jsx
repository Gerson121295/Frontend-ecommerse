
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './PasswordInput.css';

export const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder = "********",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-3 position-relative">
      {/* Label */}
      {label && (
        <label className="form-label fw-semibold text-morado">
          {label}
        </label>
      )}

      {/* Input */}
      <input
        type={showPassword ? "text" : "password"}
        className={`form-control contorno-campo-morado ${
          touched && !!error ? "is-invalid" : ""
        }`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      {/* Toggle de visibilidad */}
      <span
        className="password-toggle"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>

      {/* Mensaje de error */}
      <div className="invalid-feedback">
        {touched && !!error ? error : ""}
      </div>
    </div>
  );
};

