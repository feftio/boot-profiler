const error = require('./utils/error')

function mergeParsedProfile (options, definedProfiles, parsedProfile) {
  if (!(parsedProfile in definedProfiles)) {
    error(`profile "${parsedProfile}" is not defined in "./boot/profiles.js"`)
  }

  if (Object.prototype.toString.call(definedProfiles[parsedProfile]) !== '[object Object]') {
    error(`profile "${parsedProfile}" must be object type`)
  }

  Object.assign(options, definedProfiles[parsedProfile])
}

module.exports = {
  mergeParsedProfile
}
