const exec = require('child_process').exec

module.exports = {
  run: (options) => {
    const command = exec(`npx vite ${(JSON.parse(options.ENV_VITE_MODE) === 'development') ? 'serve' : 'build'}`, {
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
    }
  },
  profiles: {
    default: {
      ENV_VITE_MODE: 'development',
      ENV_BACKEND_URLF: 'https://example.com/hello'
    }
  }
}
