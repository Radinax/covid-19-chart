export const orderObjectByKey = (unOrderedObject, orderedKeys) => {
  const orderedData = orderedKeys.reduce((o, index) => {
    o[index] = unOrderedObject[index]
    return o
  }, {})
  return orderedData
}
