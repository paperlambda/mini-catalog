const encodeQueryParams = params => {
  return Object.entries(params)
    .map(kv => kv.map(encodeURIComponent).join('='))
    .join('&')
}

const decodeQueryParams = urlstr => {
  return urlstr
    .split('?')[1]
    .split('&')
    .map(kv => kv.split('='))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
}

export { decodeQueryParams, encodeQueryParams }
