import React from 'react';

const CheckBox = ({ label, checked, onChange, className, id}) => {
  const handleCheckboxChange = () => {
    onChange(!checked); // Toggle the checked state
  };

  return (
    <label className={`checkbox ${className ? className : ''}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      {
        label ? <span>{label}</span> : ""
      }
    </label>
  );
};

export default CheckBox;
