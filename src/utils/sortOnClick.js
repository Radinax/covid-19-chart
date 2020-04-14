export const sortOnClick = (isAsc, sortKey, data) => {
  const sortedData = data.sort((a,b) => {
    if (isAsc) {
      if (a[sortKey] > b[sortKey]) return -1
      if (a[sortKey] < b[sortKey]) return 1
      return 0;
    } else {
      if (a[sortKey] > b[sortKey]) return 1
      if (a[sortKey] < b[sortKey]) return -1
      return 0;
    }
  })
  return sortedData
}
