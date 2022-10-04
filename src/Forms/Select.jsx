import React from 'react'
import styles from '../styles.module.css'
import PropTypes from 'prop-types'
import { getSentenceFromCamelCase } from './Helpers'

const Select = ({
  className,
  disabled,
  error,
  required,
  label,
  name,
  onChange,
  style,
  data,
  validationHandler,
  value,
  size,
  labelClassName,
  filter,
  filterValue
}) => {
  const onChangeHandler = (event) => {
    console.log(event.target.value)
    const { name, value } = event.target
    onChange && onChange(name, value)
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
      <label htmlFor={name} className={labelClassName}>
        {label}
        {required && <span className={styles.required}>&nbsp;*</span>}
        {error ? (
          <span className={`${styles.required} ${styles.textSmall}`}>
            {error}
          </span>
        ) : null}
      </label>
      <select
        value={value}
        required={required}
        name={name}
        className={`${styles.blackBorder} ${className}`}
        style={style}
        disabled={disabled}
        onChange={onChangeHandler}
        onBlur={onValidationChange}
      >
        <option value=''>{label}</option>
        {data &&
          data.map((item, i) =>
            filter ? (
              <option value={item[filterValue]} key={i}>
                {item[filter]}
              </option>
            ) : (
              <option value={item.value} key={i}>
                {item.value}
              </option>
            )
          )}
      </select>
    </div>
  )
}

Select.defaultProps = {
  className: '',
  disabled: false,
  error: '',
  required: false,
  label: '',
  placeholder: '',
  style: {},
  data: [],
  validationHandler: () => {},
  size: 'medium',
  labelClassName: 'labelBlack',
  filter: '',
  filterValue: '',
  value: ''
}

Select.propTypes = {
  filter: PropTypes.string,
  filterValue: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  data: PropTypes.array.isRequired,
  validationHandler: PropTypes.func,
  value: PropTypes.any.isRequired,
  size: PropTypes.string,
  labelClassName: PropTypes.string
}

export default Select
