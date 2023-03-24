const fs = require('fs')
const path = require('path')
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice')

const { url } = require('../config.json')

module.exports = {
  name: 'rand',
  description: 'Play random sound.',
  async execute (message, args) {
    if (!message.guild) return

    const voiceChannel = message.member.voice.channel
    if (voiceChannel) {
      const connection = joinVoiceChannel({ channelId: voiceChannel.id, guildId: voiceChannel.guild.id, adapterCreator: voiceChannel.guild.voiceAdapterCreator })

      const files = fs.readdirSync(path.join(__dirname, '..', 'sounds'))
      const index = Math.floor(Math.random() * Math.floor(files.length))
      const url2play = `${url}/${files[index]}`
  
      const player = createAudioPlayer()
      const resource = createAudioResource(url2play)
      player.play(resource)
      connection.subscribe(player)
  
      player.on(AudioPlayerStatus.Playing, () => {
        message.client.user.setActivity('SimpleSoundBoard', { type: 'LISTENING' })
      })
      player.on('error', () => {
        message.channel.send('Je n\'ai pas réussi à lire cette vidéo !')
        player.destroy()
        voiceChannel.leave()
      })
      player.on(AudioPlayerStatus.Idle, () => {
        player.destroy()
        voiceChannel.leave()
      })
    } else {
      message.reply('You need to join a voice channel first!')
    }
  }
}
