import React, { useState } from 'react'
import styles from '../styles.module.css'
import PropTypes from 'prop-types'
import { getRegExp, getSentenceFromCamelCase } from './Helpers'
const AutoComplete = ({
  data,
  checked,
  className,
  disabled,
  error,
  fixLength,
  required,
  label,
  minLength,
  maxLength,
  name,
  onChange,
  placeholder,
  reqType,
  style,
  type,
  validationHandler,
  value,
  size,
  labelClassName,
  select,
  selectValue,
  getResponse
}) => {
  const [active, setActive] = useState(0)
  const [filtered, setFiltered] = useState([])
  const [isShow, setIsShow] = useState(false)
  const [input, setInput] = useState('')

  const onChangeHandler = (e) => {
    const input = e.currentTarget.value
    const newFilteredSuggestions = select
      ? data.filter(
          (x) =>
            x[select] !== null &&
            x[select].toLowerCase().indexOf(input.toLowerCase()) > -1
        )
      : data.filter(
          (x) => x !== null && x.toLowerCase().indexOf(input.toLowerCase()) > -1
        )

    setActive(0)
    setFiltered(newFilteredSuggestions)
    setIsShow(true)
    setInput(e.currentTarget.value)
  }
  const onClick = (e) => {
    setActive(0)
    setFiltered([])
    setIsShow(false)
    const res = select
      ? data.find((x) => x[select] === e.currentTarget.innerText)
      : e.currentTarget.innerText
    onChange && onChange(name, res)
    setInput(e.currentTarget.innerText)
  }

  const onValidationChange = (event) => {
    if (!validationHandler) return
    const { value } = event.target
    let errorMessage = ''
    if (!value && required) {
      errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`
    } else if (minLength && value.length < minLength) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
      } must be at least ${minLength} characters long.`
    } else if (maxLength && value.length > maxLength) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
      } must be ${minLength} characters long.`
    } else if (fixLength && value.length !== fixLength) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
      } must be ${fixLength} characters.`
    } else if (value && reqType && !getRegExp(reqType).test(value)) {
      errorMessage = `Please enter valid ${getSentenceFromCamelCase(name)}.`
    }
    validationHandler(name, errorMessage)
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      // enter key
      setActive(0)
      setIsShow(false)
      setInput(filtered[active])
    } else if (e.keyCode === 38) {
      // up arrow
      return active === 0 ? null : setActive(active - 1)
    } else if (e.keyCode === 40) {
      // down arrow
      return active - 1 === filtered.length ? null : setActive(active + 1)
    }
  }
  const renderAutocomplete = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <ul className={styles.autocomplete}>
            {filtered.map((suggestion, index) => {
              let className
              if (index === active) {
                className = 'active'
              }
              return (
                <li className={className} key={index} onClick={onClick}>
                  {select ? suggestion[select] : suggestion}
                </li>
              )
            })}
          </ul>
        )
      } else {
        return (
          <div className={styles.noautocomplete}>
            <em>Not found</em>
          </div>
        )
      }
    }
    return <div></div>
  }
  return (
    <div className={`${styles.InputContainer} ${styles[size]}`}>
      <label htmlFor={name} className={labelClassName}>
        {label}
        {required && <span className={styles.required}>&nbsp;*</span>}
        {error ? (
          <span className={`${styles.required} ${styles.textSmall}`}>
            {error}
          </span>
        ) : null}
      </label>

      <input
        name={name}
        id={name}
        type='text'
        onChange={onChangeHandler}
        onKeyDown={onKeyDown}
        value={input}
        placeholder={placeholder}
        className={`${styles.blackBorder} ${className}`}
        required={required}
        style={style}
        disabled={disabled}
        onBlur={onValidationChange}
      />
      {renderAutocomplete()}
    </div>
  )
}

AutoComplete.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  error: '',
  fixLength: 0,
  required: false,
  label: '',
  minLength: 0,
  maxLength: 0,
  placeholder: '',
  reqType: '',
  style: {},
  type: 'text',
  validationHandler: () => {},
  getResponse: () => {},
  size: 'medium',
  labelClassName: styles.labelBlack,
  value: '',
  select: '',
  selectValue: ''
}

AutoComplete.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  fixLength: PropTypes.number,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  getResponse: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  reqType: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  validationHandler: PropTypes.func,
  value: PropTypes.any.isRequired,
  select: PropTypes.any.isRequired,
  selectValue: PropTypes.string,
  size: PropTypes.string,
  labelClassName: PropTypes.string
}
export default AutoComplete
