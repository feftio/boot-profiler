module.exports = {
  StringCast: (value) => {
    return String(value)
  },
  NumberCast: (value) => {
    return Number(value)
  },
  BooleanCast: (value) => {
    if (value === 'true') return true
    if (value === 'false') return false
    return value
  },
  StringOrNullCast: (value) => {
    if (value === 'null') return null
    return String(value)
  },
  ArrayCast: (value) => {
    return value.split(';')
  },
  ArrayOrAsteriskCast: (value) => {
    if (value === '*') return value
    return value.split(';')
  }
}
