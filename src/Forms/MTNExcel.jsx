import React from 'react'
import PropTypes from 'prop-types'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import styles from '../styles.module.css'

const MTNExcel = ({ filename, tableColumn, content }) => {
  return (
    <div>
      <div className={styles.btnContainer}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className={`${styles.btn}`}
          table='myTable'
          filename={filename}
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <table id='myTable' style={{ visibility: 'hidden' }}>
        <thead>
          <tr>
            {tableColumn?.map((item, i) => (
              <th key={i}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content?.map((item, i) => (
            <tr key={i}>
              {Object.values(content?.[i])?.map((child, x) => (
                <td key={x}>
                  {Array.isArray(child) ? (
                    <a href={child?.[0]?.url}>{child?.[0]?.name}</a>
                  ) : (
                    child
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

MTNExcel.defaultProps = {
  filename: '',
  tableColumn: [],
  content: []
}

MTNExcel.propTypes = {
  filename: PropTypes.string,
  tableColumn: PropTypes.array,
  content: PropTypes.array
}
export default MTNExcel
