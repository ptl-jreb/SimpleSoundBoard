const fs = require('fs')
const path = require('path')

module.exports = {
  name: 'p',
  description: 'Play requested sound.',
  async execute (message, args) {
    if (!message.guild) return

    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join()
      if (!args[0]) message.channel.send('You need to provide a sound code!')

      const sound = (Math.floor(Math.random() * Math.floor(10)) > 7) ? 'rickrolled' : args[0]

      if (!fs.existsSync(path.join(__dirname, '..', 'sounds', sound + '.mp3'))) {
        message.channel.send('Sound does not exists !')
      } else {
        const url2play = `http://ssb.digidrive.io/${sound}.mp3`
        const dispatcher = connection.play(url2play, { volume: 1 })
        if (sound === 'rickrolled') message.channel.send('You\'ve been RICKROLLED !')
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
      }
    } else {
      message.reply('You need to join a voice channel first!')
    }
  }
}
