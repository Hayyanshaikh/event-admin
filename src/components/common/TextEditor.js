import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ placeholder, value, onChange,label,valid, className }) => {

  const toolbarOptions = [
    [{ 'header': ['normal', 1, 2, 3, 4, 5, 6] }, 'bold', 'italic', 'underline', 'strike', 'link', { list: 'ordered' }, { list: 'bullet' }, 'clean'],
  ];

  return (
    <div className={`input_field ${className ? className : ""}`}>
      <label htmlFor={label}>{label}</label>
      <ReactQuill
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={{
          toolbar: {
            container: toolbarOptions,
          },
        }}
      />
      <small>{valid}</small>
    </div>
  );
};

export default TextEditor;
