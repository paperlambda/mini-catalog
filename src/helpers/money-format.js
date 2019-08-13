const moneyFormat = (number) => {
  return new Intl.NumberFormat('id', { maximumSignificantDigits: 3 }).format(number)
}

export default moneyFormat
