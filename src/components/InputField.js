import React from 'react';
import './InputField.css';

function InputField({ label, type, name, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} required />
    </div>
  );
}

export default InputField;
