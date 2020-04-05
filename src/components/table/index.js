import React, { Fragment, useState } from 'react'
import { string, arrayOf, object, bool } from 'prop-types'
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'

const Table = ({ headerData, bodyData, isMobile }) => {
  const [data, setData] = useState(null)
  const [asc, setAsc] = useState(true)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sortOnClick = (sortKey) => {
    const sortedData = bodyData.sort((a,b) => {
      if (asc) {
        if (a[sortKey] > b[sortKey]) return -1
        if (a[sortKey] < b[sortKey]) return 1
        return 0;
      } else {
        if (a[sortKey] > b[sortKey]) return 1
        if (a[sortKey] < b[sortKey]) return -1
        return 0;
      }
    })
    setAsc(!asc)
    setData([...sortedData])
  }

  const titles = headerData.map(head => (
    <th
      key={head}
      style={{ textAlign: 'start'}}
    >
      <button onClick={() => sortOnClick(head)}>{capitalizeFirstLetter(head)}</button>
    </th>
  ))

  const tableHeader = <thead><tr>{titles}</tr></thead>

  const tableBody = (someData) => {
    const tableData = someData.map((data, i) => {
      return (
        <tr key={i}>
          {Object.keys(data).map((info, i) => (
            <td key={info} style={{ textAlign: i > 0 ? 'end' : 'start' }}>{data[info]}</td>)
          )}
        </tr>
      )
    })
    return <tbody>{tableData}</tbody>
  }

  const temp = data || bodyData

  return (
    <Fragment>
      <table style={{ marginTop: isMobile ? '0' : '2rem', paddingRight: '1rem' }}>
        {tableHeader}
        {tableBody(temp)}
      </table>
    </Fragment>
  )
}

Table.propTypes = {
  headerData: arrayOf(string),
  bodyData: arrayOf(object),
  isMobile: bool,
}

export default Table;
