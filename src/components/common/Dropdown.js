import React,{ useState } from 'react'
import * as Icons from "react-icons/tb";

const Dropdown = ({className, placeholder, onClick, options}) => {
  const [dropdown, setDropdown] = useState(false);
  const handleOptionClick = (option) => {
    if (onClick) {
      onClick(option);
    }
    setDropdown(!dropdown)
  }
  const handleDropdown = () => {
    setDropdown(!dropdown)
  }
  return (
    <>
      <div className={`dropdown ${className ? className : ""}`}>
        <span onClick={handleDropdown} className="dropdown_placeholder">
          {placeholder}
          <Icons.TbChevronDown/>
        </span>
        <ul className={`${dropdown ? "active" : ""} dropdown_options`}>
          {
            options.map((option, key)=>(
              <li key={key} onClick={()=>handleOptionClick(option)}>{option.value}</li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default Dropdown