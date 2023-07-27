import React, { useEffect, useState } from 'react'
import styles from '../styles.module.css'
import PropTypes from 'prop-types'
import { getSentenceFromCamelCase } from './Helpers'
import Tag from './Tag'

const MultiSelect = ({
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
  const [open, setOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [search, setSearch] = useState('')

  const onChangeHandler = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option))
      setOpen(false)
      onChange &&
        onChange(
          name,
          selectedOptions.filter((item) => item !== option)
        )
    } else {
      const newItem = [...selectedOptions]
      setSelectedOptions([...selectedOptions, option])
      newItem.push(option)
      onChange && onChange(name, newItem)
      setOpen(false)
    }
  }

  const onValidationChange = () => {
    if (!validationHandler) return
    let errorMessage = ''
    if (!selectedOptions && required) {
      errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`
    }
    validationHandler(name, errorMessage)
    setOpen(false)
  }

  const handleSearch = (event) => {
    const query = event.target.value
    setSearch(query)

    const filteredResults = data.filter((x) => {
      return (
        x[filter]?.toLowerCase().includes(query?.toLowerCase()) ||
        x.value?.toLowerCase().includes(query?.toLowerCase())
      )
    })
    if (filteredResults?.length === 0) {
      setSearchResults(data)
    } else {
      setSearchResults(filteredResults)
    }
  }

  useEffect(() => {
    if (data) {
      setSearchResults(data)
    }
  }, [data])

  const getItemName = (item) => {
    const newData = data?.find((x) => x[filterValue] === item)
    const newOption = filter ? newData[filter] : item
    return newOption
  }

  const removeHandler = (id) => {
    const items = selectedOptions?.filter((x) => x !== id)
    setSelectedOptions(items)
  }

  return (
    <div
      className={`${styles.InputContainer} ${styles[size]}`}
      onBlur={onValidationChange}
    >
      <label htmlFor={name} className={labelClassName}>
        {label}
        {required && <span className={styles.required}>&nbsp;*</span>}
        {error ? (
          <span className={`${styles.required} ${styles.textSmall}`}>
            {error}
          </span>
        ) : null}
      </label>

      <div
        onClick={() => setOpen(!open)}
        className={`${styles.cxt} ${styles.blackBorder} ${className}`}
        style={style}
      >
        <div className={styles.cxtFlex}>
          {selectedOptions.map((option, i) => (
            <Tag
              item={getItemName(option)}
              key={i}
              remove={removeHandler}
              value={option}
            />
          ))}
        </div>
      </div>

      {open && (
        <div className={styles.dropdownContainer}>
          <div className={styles.searchContainer}>
            <input
              placeholder='Search for items...'
              value={search}
              onKeyDown={handleSearch}
              type='search'
              onChange={handleSearch}
            />
          </div>

          <div className={styles.options}>
            {searchResults?.map((item, i) => (
              <label key={i}>
                <input
                  type='checkbox'
                  checked={selectedOptions.includes(
                    !filter ? item?.value : item[filterValue]
                  )}
                  onChange={() =>
                    onChangeHandler(!filter ? item?.value : item[filterValue])
                  }
                />
                {!filter ? item?.value : item[filter]}
              </label>
            ))}

            {/* Add more options as needed */}
          </div>
        </div>
      )}
    </div>
  )
}

export default MultiSelect

MultiSelect.defaultProps = {
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
  value: '',
  title: ''
}

MultiSelect.propTypes = {
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
  labelClassName: PropTypes.string,
  title: PropTypes.string
}
