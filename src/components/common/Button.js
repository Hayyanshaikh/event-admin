import React from 'react'

const Button = ({label, className, onClick,type,icon}) => {
  return (
    <>
      <button type={type} className={`button ${className ? className : ""}`} onClick={onClick}>
        {label ? <span>{label}</span> : null}
        {icon ? icon : ""}
      </button>
    </>
  )
}

export default Button