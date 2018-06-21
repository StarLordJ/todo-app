import React from 'react';

function Input({ className, inputClass, type, name, placeholder, value, defaultValue }) {
  return (
      <div className={className}>
        <input 
          type={type} 
          name={name} 
          className={inputClass} 
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
        />
      </div>
  );
}
export default Input;