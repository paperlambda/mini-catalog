const encodeQueryParams = params => {
  return Object.entries(params)
    .filter(([, value]) => {
      if (value === '') {
        return false
      }
      if (Array.isArray(value) && value.length === 0) {
        return false
      }
      return true
    })
    .map(kv => kv.map(encodeURIComponent).join('='))
    .join('&')
}

const decodeQueryParams = urlstr => {
  return urlstr
    .split('?')[1]
    .split('&')
    .map(kv => kv.split('='))
    .reduce((obj, [key, value]) => {
      let dValue = decodeURIComponent(value)

      // Test if comma delimited string
      if (/%2C/.test(String(value))) {
        dValue = dValue.split(',')
      }
      return { ...obj, [key]: dValue }
    }, {})
}

export { decodeQueryParams, encodeQueryParams }
