const fs = require('fs')
const path = require('path')

module.exports = {
  name: 'list',
  description: 'List sounds.',
  async execute (message, args) {
    if (!message.guild) return
    const files = fs.readdirSync(path.join(__dirname, '..', 'sounds'))
    let str = `Sounds list:`
    files.forEach(file => (str = str + `  -${file.replace('.mp3', '')}`))
    message.reply(str)
  }
}
