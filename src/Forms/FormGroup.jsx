import React from 'react'
import styles from '../styles.module.css'
import PropTypes from 'prop-types'
import CheckFormValidation from './Helpers'

const FormGroup = ({ children, onSubmit, validation, errors, setErrors }) => {
  const submitHandler = (e) => {
    e.preventDefault()
    const validationError = CheckFormValidation(errors, validation)
    // console.log(validationError)
    // console.log(validation)
    if (Object.keys(validationError).length !== 0) {
      return setErrors(validationError)
    }
    onSubmit()
  }
  return (
    <form onSubmit={submitHandler}>
      <div className={styles.inputFlex}>{children}</div>
    </form>
  )
}

FormGroup.defaultProps = {
  onSubmit: () => {},
  setErrors: () => {},
  validation: {},
  errors: {}
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  validation: PropTypes.object,
  errors: PropTypes.object
}
export default FormGroup
