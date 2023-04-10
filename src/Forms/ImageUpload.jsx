import React from 'react'
import styles from '../styles.module.css'
import PropTypes from 'prop-types'
import { getSentenceFromCamelCase } from './Helpers'

const ImageUpload = ({
  name,
  size,
  bgColor = 'success',
  disabled,
  loading,
  error,
  required,
  label,
  onChange,
  validationHandler,
  value,
  multiple,
  className
}) => {
  const onChangeHandler = (event) => {
    const { name, files } = event.target
    const file = []

    for (var i = 0; i < files.length; i++) {
      file.push(files[i])
    }
    onChange && onChange(name, file)
  }

  const onValidationChange = (event) => {
    if (!validationHandler) return
    const { value } = event.target
    let errorMessage = ''
    if (!value && required) {
      errorMessage = `Please upload ${getSentenceFromCamelCase(name)}.`
    }
    validationHandler(name, errorMessage)
  }
  return (
    <div className={`${styles.uploadContainer} ${styles[size]}`}>
      <div className={styles.first}>
        <label htmlFor={name}>
          {label} {required && <span className='required'>*</span>}
        </label>
      </div>

      <div className={styles.second}>
        <div className={styles.uploadWrapper}>
          <button
            className={`${styles.uploadBtn} ${styles[size]} ${className} `}
            disabled={loading}
          >
            {!loading ? (
              <span>Click Here</span>
            ) : (
              <div>
                Uploading <span className={styles.loading}></span>
              </div>
            )}
          </button>
          <input
            id={name}
            type='file'
            disabled={disabled}
            onChange={onChangeHandler}
            onBlur={onValidationChange}
            value={value}
            multiple={multiple}
            name={name}
            required={required}
          />
          {error ? (
            <span className={`${styles.required} ${styles.textSmall}`}>
              {error}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}

ImageUpload.defaultProps = {
  checked: false,
  bgColor: '',
  disabled: false,
  error: '',
  required: false,
  multiple: true,
  label: '',
  placeholder: '',
  reqType: '',
  style: {},
  type: 'text',
  validationHandler: () => {},
  size: 'medium',
  labelClassName: styles.labelBlack,
  value: '',
  className: ''
}

ImageUpload.propTypes = {
  checked: PropTypes.bool,
  multiple: PropTypes.bool,
  bgColor: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  reqType: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  validationHandler: PropTypes.func,
  value: PropTypes.any.isRequired,
  size: PropTypes.string,
  labelClassName: PropTypes.string,
  className: PropTypes.string
}

export default ImageUpload
