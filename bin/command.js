#!/usr/bin/env node
const program = require('commander')
const {
  mergeParsedProfile
} = require('../lib/profile')
const {
  mergeParsedOptions,
  validateOptions,
  loadOptions,
  pack
} = require('../lib/options')
const error = require('../lib/utils/error')
const {
  requireConfig
} = require('../lib/utils/config')
const {
  options: definedOptions,
  profiles: definedProfiles,
  run: definedRun
} = requireConfig()

const options = {}

program
  .description('CLI for serving and building a project')
  .argument('<profile>', 'project booting set of options')
  .action((parsedProfile, parsedOptions) => {
    mergeParsedProfile(options, definedProfiles, parsedProfile)
    mergeParsedOptions(options, definedOptions, parsedOptions)
    validateOptions(options, definedOptions)
  })

loadOptions(program, definedOptions)

program.parse()

try {
  definedRun(pack(options), options)
} catch (e) {
  error('failed "run" function execution', e)
}
