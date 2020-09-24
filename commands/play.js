module.exports = {
  name: 'play',
  description: 'Play requested sound.',
  async execute (message, args) {
    if (!message.guild) return

    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join()
      const sound = args[0]
      let url2play = ''
      switch (sound) {
        case 'wow':
          url2play = 'http://ssb.digidrive.io/wow.mp3'
          break
        case 'coucou':
          url2play = 'http://ssb.digidrive.io/coucou.mp3'
          break
        case 'zizi':
          url2play = 'http://ssb.digidrive.io/zizi.mp3'
          break
        case 'sad':
          url2play = 'http://ssb.digidrive.io/sad.mp3'
          break
        default:
          url2play = 'http://ssb.digidrive.io/nope.mp3'
      }
      const dispatcher = connection.play(url2play, { volume: 1 })

      dispatcher.on('start', () => {
        message.client.user.setActivity('SimpleSoundBoard', { type: 'LISTENING' })
      })

      dispatcher.on('error', () => {
        message.reply('Je n\'ai pas réussi à lire cette vidéo !')
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
