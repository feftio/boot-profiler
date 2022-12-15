const path = require('path')
const fs = require('fs')
const error = require('./error')

const DEFAULT_CONFIG_FILENAME = 'boot.config.js'

function requireConfig (filename = DEFAULT_CONFIG_FILENAME) {
  const directory = process.cwd()
  const fullpath = path.join(directory, filename)
  let config = null

  if (!(fs.existsSync(fullpath))) {
    error(`${filename} is not defined in "${directory}" directory`)
  }

  try {
    config = require(fullpath)
  } catch (e) {
    error(`cannot require config "${fullpath}"`, e)
  }

  if (!('options' in config)) {
    error('field "options" is not defined in config')
  }

  if (!('profiles' in config)) {
    error('field "profiles" is not defined in config')
  }

  if (!('run' in config)) {
    error('field "run" is not defined in config')
  }

  return config
}

module.exports = {
  requireConfig
}
