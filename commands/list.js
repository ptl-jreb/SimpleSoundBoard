const fs = require('fs')
const path = require('path')

module.exports = {
  name: 'list',
  description: 'List sounds.',
  async execute (message, args) {
    if (!message.guild) return
    const files = fs.readdirSync(path.join(__dirname, '..', 'sounds'))
    let str = ''
    files.forEach(file => (str = str + str.length ? ', ' : '' + `${file.replace('.mp3', '')}`))
    message.reply(`Sounds list: ${str}`)
  }
}
