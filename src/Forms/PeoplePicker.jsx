import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './pick.module.css'
import { getSentenceFromCamelCase } from './Helpers'

const PeoplePicker = ({
  data,
  disabled,
  label,
  name,
  onChange,
  placeholder,
  value,
  validationHandler,
  select,
  defaultValues,
  className,
  required,
  error,
  style,
  size
}) => {
  const [input, setInput] = useState('')
  const [selectedOptions, setSelectedOptions] = useState(
    value || defaultValues || [] // Use defaultValues if provided
  )
  const [filtered, setFiltered] = useState(data)
  const [showDropdown, setShowDropdown] = useState(false)

  const inputRef = useRef()

  useEffect(() => {
    const newFilteredSuggestions = data.filter((user) => {
      const lowerInput = input.toLowerCase()
      return Object.values(user).some(
        (value) =>
          value !== null &&
          value.toString().toLowerCase().indexOf(lowerInput) > -1
      )
    })

    setFiltered(newFilteredSuggestions)
    setShowDropdown(true)
  }, [input, data])

  const handleChange = (selectedOption) => {
    if (
      !selectedOptions.some(
        (option) => option[select] === selectedOption[select]
      )
    ) {
      setInput('')

      const defaultOption = defaultValues
        ? defaultValues.find(
            (value) => value[select] === selectedOption[select]
          )
        : undefined

      const mergedOption = defaultOption
        ? { ...selectedOption, ...defaultOption }
        : selectedOption

      setSelectedOptions([...selectedOptions, mergedOption])
      onChange && onChange(name, [...selectedOptions, mergedOption])
    }
  }
  const handleDelete = (optionToDelete) => () => {
    const updatedOptions = selectedOptions.filter(
      (option) => option !== optionToDelete
    )
    setSelectedOptions(updatedOptions)
    onChange && onChange(name, updatedOptions)
  }

  const onValidationChange = (event) => {
    if (!validationHandler) return
    const { value } = event.target
    let errorMessage = ''
    if (!value && required) {
      errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`
    }
    validationHandler(name, errorMessage)
  }

  return (
    <div className={`${styles.InputContainer} ${styles[size]}`}>
      <label htmlFor={name} className={styles.labelBlack}>
        {label}
        {required && <span className={styles.required}>&nbsp;*</span>}
        {error && (
          <span className={`${styles.required} ${styles.textSmall}`}>
            {error}
          </span>
        )}
      </label>

      <div className={styles.selectedOptionsContainer}>
        {selectedOptions.map((option) => (
          <div key={option[select]} className={styles.selectedOption}>
            {option[select]}
            <span className={styles.deleteIcon} onClick={handleDelete(option)}>
              X
            </span>
          </div>
        ))}
      </div>

      <input
        ref={inputRef}
        name={name}
        id={name}
        type='text'
        value={input}
        placeholder={placeholder}
        className={`${styles.blackBorder} ${className}`}
        required={required}
        style={style}
        disabled={disabled}
        onChange={(e) => setInput(e.target.value)}
        onBlur={onValidationChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setShowDropdown(false)
            setInput('')
            e.preventDefault()
          }
        }}
        onFocus={() => setShowDropdown(true)}
      />

      {showDropdown && input && (
        <ul className={styles.autocomplete}>
          {filtered.map((suggestion, index) => {
            return (
              <li
                key={index}
                className={styles.autocompleteOption}
                onClick={() => handleChange(suggestion)}
              >
                {suggestion[select]}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

PeoplePicker.defaultProps = {
  className: '',
  disabled: false,
  error: '',
  required: false,
  label: '',
  minLength: 0,
  maxLength: 0,
  placeholder: '',
  reqType: '',
  style: {},
  type: 'text',
  validationHandler: () => {},
  size: 'medium',
  labelClassName: styles.labelBlack,
  value: '',
  select: '',
  selectValue: ''
}

PeoplePicker.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
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

export default PeoplePicker
