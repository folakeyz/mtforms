import React from 'react'
import styles from '../styles.module.css'
import PropTypes from 'prop-types'

const Button = ({
  onClick,
  type,
  title,
  size,
  bgColor,
  className,
  disabled,
  loading,
  style
}) => {
  return (
    <div className={`${styles.InputContainer} ${styles[size]}`}>
      <button
        type={type}
        onClick={onClick}
        className={className}
        disabled={disabled || loading}
        style={{ background: bgColor, ...style }}
      >
        {title}
        {loading && <span className={styles.loading}></span>}
      </button>
    </div>
  )
}

Button.defaultProps = {
  className: '',
  disabled: false,
  loading: false,
  title: '',
  style: {},
  type: 'submit',
  size: 'medium',
  bgColor: '#1776c4'
}

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  type: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string
}

export default Button
