import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './pick.styles.module.css' // Import your CSS file for styling

const PeoplePicker = ({
  titleText,
  personSelectionLimit,
  groupName,
  showtooltip,
  required,
  disabled,
  showHiddenInUI,
  principalTypes,
  resolveDelay,
  defaultSelectedUsers,
  onChange
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(() => {
    // Simulating data retrieval
    const mockUsers = ['User1', 'User2', 'User3', 'User4', 'User5']

    const filtered = mockUsers.filter((user) =>
      user.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setFilteredUsers(filtered)
  }, [searchQuery])

  const handleUserSelect = (user) => {
    if (onChange) {
      onChange(user)
    }
  }

  return (
    <div className={styles.peoplepicker}>
      <label className={styles.peoplepickerlabel}>{titleText}</label>
      <input
        type='text'
        placeholder='Search for members'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        disabled={disabled}
      />
      <div className={styles.peoplepickerresults}>
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className={styles.peoplepickerresult}
            onClick={() => handleUserSelect(user)}
          >
            {user}
          </div>
        ))}
      </div>
    </div>
  )
}

PeoplePicker.propTypes = {
  titleText: PropTypes.string.isRequired,
  personSelectionLimit: PropTypes.number,
  groupName: PropTypes.string,
  showtooltip: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  showHiddenInUI: PropTypes.bool,
  principalTypes: PropTypes.arrayOf(PropTypes.string),
  resolveDelay: PropTypes.number,
  defaultSelectedUsers: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
}

export default PeoplePicker
