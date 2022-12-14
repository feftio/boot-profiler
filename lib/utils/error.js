function error (...messages) {
  messages.forEach(message => {
    console.error('error: ' + message)
  })
  process.exit(1)
}

module.exports = error
