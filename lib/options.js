const requireConfig = require('./utils/config').requireConfig
const error = require('./utils/error')

function mergeParsedOptions (options, definedOptions, parsedOptions) {
  Object.entries(parsedOptions).forEach(([name, value]) => {
    try {
      const casted = definedOptions[name].cast(value)
      Object.assign(options, {
        [name]: casted
      })
    } catch (e) {
      error(`failed casting of "${name}" option`, e)
    }
  })
}

function loadOptions (program, definedOptions) {
  Object.entries(definedOptions).forEach(([name, option]) => {
    const definitions = {
      short: ('flag' in option) ? option.flag : '',
      long: `--${name}`
    }
    const type = ('type' in option) ? option.type : '<unknown>'
    const help = ('help' in option) ? option.help : ''
    program.option(Object.values(definitions).join(', ') + ` ${type}`, help)
  })
}

function validateOptions (options, definedOptions) {
  for (const name in options) {
    if (typeof definedOptions[name]?.validator === 'function') {
      if (!definedOptions[name].validator(options[name])) {
        error(`failed validation of "${name}" option`)
      }
    }
  }
}

function pack (options) {
  const config = requireConfig()
  const names = Object.keys(config.options)

  for (const name in options) {
    if (names.includes(name)) {
      options[name] = JSON.stringify(options[name])
    }
  }

  return options
}

function unpack (options) {
  const config = requireConfig()
  const names = Object.keys(config.options)

  for (const name in options) {
    if (names.includes(name)) {
      options[name] = JSON.parse(options[name])
    }
  }

  return options
}

module.exports = {
  mergeParsedOptions,
  loadOptions,
  validateOptions,
  pack,
  unpack
}
