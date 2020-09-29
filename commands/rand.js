const fs = require('fs')
const path = require('path')

module.exports = {
  name: 'p',
  description: 'Play requested sound.',
  async execute (message, args) {
    if (!message.guild) return

    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join()

      const files = fs.readdirSync(path.join(__dirname, '..', 'sounds'))
      const index = Math.floor(Math.random() * Math.floor(files.length))
      const url2play = `http://ssb.digidrive.io/${files[index]}`
      const dispatcher = connection.play(url2play, { volume: 1 })
      dispatcher.on('start', () => {
        message.client.user.setActivity('SimpleSoundBoard', { type: 'LISTENING' })
      })
      dispatcher.on('error', () => {
        message.channel.send('Je n\'ai pas réussi à lire cette vidéo !')
        dispatcher.destroy()
        message.member.voice.channel.leave()
      })
      dispatcher.on('finish', () => {
        dispatcher.destroy()
        message.member.voice.channel.leave()
      })
    } else {
      message.reply('You need to join a voice channel first!')
    }
  }
}
