const fs = require('fs')
const path = require('path')

module.exports = {
  name: 'list',
  description: 'List sounds.',
  async execute (message, args) {
    if (!message.guild) return
    const files = fs.readdirSync(path.join(__dirname, '..', 'sounds'))
    files.sort((a, b) => a.localeCompare(b))
    let str = ''
    files.forEach(file => (str = str + (str.length ? "\n " : '') + `${file.replace('.mp3', '')}`))
    if (message.member.voice.channel) {
      message.channel.send(`Sounds list: ${str}`)
    } else {
      message.reply(`Sounds list: ${str}`)
    }
  }
}
