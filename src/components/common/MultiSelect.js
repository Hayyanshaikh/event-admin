import React, { useState, useRef, useEffect } from "react";
import * as Icons from "react-icons/tb";

const MultiSelect = ({ className,label, options, placeholder, isMulti = true }) => {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState([]);
  const [bool, setBool] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef(null);

  const selectedHandle = (value) => {
    if (!isMulti) {
      setSelected([value]);
      setBool(false);
      setValue("");
      setFilteredOptions(options);
    } else {
      setSelected((prevSelected) => [...prevSelected, value]);
      setBool(false);
      setValue("");
      setFilteredOptions(options);
    }
  };

  const inputClickHandle = () => {
    setBool(!bool);
  };

  const changeHandler = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setBool(false);
    }
  };

  const removeTagHandle = (tag) => {
    setSelected(selected.filter((selectedValue) => selectedValue !== tag));
    setFilteredOptions(options);
  };

  const clearAllHandle = () => {
    setSelected([]);
    setFilteredOptions(options);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={`multi_select input_field ${className ? className : ""}`}
      ref={inputRef}
    >
      {
        label ? <label>{label}</label> : ''
      }
      <div className="selected_tags">
        {selected.map((select, key) => (
          <span
            key={key}
            className={`${!isMulti ? "selected_tag single" : "selected_tag"}`}
          >
            {select}
            {!isMulti ? (
              ""
            ) : (
              <Icons.TbX
                className="remove_tags"
                onClick={() => removeTagHandle(select)}
              />
            )}
          </span>
        ))}
      </div>
      {!isMulti && selected.length === 0 ? (
        <input
          type="text"
          className={bool ? "active" : ""}
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
          onClick={inputClickHandle}
        />
      ) : isMulti ? (
        <input
          type="text"
          className={bool ? "active" : ""}
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
          onClick={inputClickHandle}
        />
      ) : null}
      <Icons.TbChevronDown className="chevron_down" />
      {selected.length !== 0 ? (
        <Icons.TbX className="remove_tags" onClick={clearAllHandle} />
      ) : null}
      <ul className={`select_dropdown ${bool ? "active" : ""}`}>
        {filteredOptions.map((option, key) => {
          const isOptionSelected = selected.includes(option.label);
          return (
            <li
              key={key}
              className={`select_dropdown_item ${
                isOptionSelected ? "disabled" : ""
              }`}
              onClick={() => !isOptionSelected && selectedHandle(option.label)}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MultiSelect;
