const program = require('commander')
const { mergeParsedProfile } = require('./profile')
const { mergeParsedOptions, validateOptions, loadOptions, pack } = require('./options')
const { requireConfig } = require('./utils/config')
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
    pack(options)
  })

loadOptions(program, definedOptions)

program.parse()

definedRun(options)
