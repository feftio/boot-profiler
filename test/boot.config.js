const exec = require('child_process').exec
const casts = require('../lib/utils/casts')

module.exports = {
  run: (options) => {
    const vm = (JSON.parse(options.ENV_VITE_MODE) === 'development') ? 'serve' : 'build'
    const command = exec(`npx vite ${vm}`, {
      env: {
        ...process.env,
        ...options
      }
    })
    command.stdout.on('data', data => console.log(data.toString()))
    command.stderr.on('data', data => console.error(data.toString()))
    command.on('exit', code => console.log(code.toString()))
  },
  options: {
    ENV_VITE_MODE: {
      cast: String,
      flag: '-vm',
      type: '<development|production>',
      help: 'type of start',
      validator: (value) => {
        return ['development', 'production'].includes(value)
      }
    },
    ENV_BACKEND_URL: {
      cast: String,
      flag: '-bu',
      type: '<url>',
      help: 'backend api address'
    },
    ENV_INCLUDED_ROUTES: {
      cast: casts.ArrayCast,
      flag: '-ir',
      type: '<array>',
      help: 'inclued vue routes',
      validator: (value) => {
        return value.includes('three')
      }
    },
    ENV_ARRAY: {
      cast: casts.ArrayCast,
      type: '<array>'
    }
  },
  profiles: {
    default: {
      ENV_VITE_MODE: 'development',
      ENV_BACKEND_URLF: 'https://example.com/hello',
      ENV_INCLUDED_ROUTES: ['one', 'two', 'three'],
      ENV_ARRAY: ['1', 1, true]
    }
  }
}
