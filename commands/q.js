const fs = require('fs')
const path = require('path')
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice')

const categories = require('../categories.json')
const { url } = require('../config.json')

module.exports = {
  name: 'q',
  description: 'Play requested sound.',
  async execute (message, args) {
    if (!message.guild) return


    const voiceChannel = message.member.voice.channel
    if (voiceChannel) {
      const connection = joinVoiceChannel({ channelId: voiceChannel.id, guildId: voiceChannel.guild.id, adapterCreator: voiceChannel.guild.voiceAdapterCreator})
      if (!args[0]) message.channel.send('You need to provide a sound code!')

      let category = categories[args[0]]
      if (category && category.length) {
        let sound = (Math.floor(Math.random() * Math.floor(20)) > 19) ? 'rickrolled' : category[Math.floor(Math.random() * category.length)] // mouhaha
        if (!fs.existsSync(path.join(__dirname, '..', 'sounds', sound + '.mp3'))) {
          message.channel.send('Sound does not exists !')
        } else {
          const url2play = `${url}/${sound}.mp3`

          const player = createAudioPlayer()
          const resource = createAudioResource(url2play)
          player.play(resource)
          connection.subscribe(player)

          if (sound === 'rickrolled') message.channel.send('You\'ve been RICKROLLED !')

          player.on(AudioPlayerStatus.Playing, () => {
            message.client.user.setActivity('SimpleSoundBoard', { type: 'LISTENING' })
          })
          player.on('error', () => {
            message.channel.send('Je n\'ai pas réussi à lire ce son :(')
            player.stop()
            connection.destroy()
          })
          player.on(AudioPlayerStatus.Idle, () => {
            player.stop()
            connection.destroy()
          })
        }
      } else {

        let sound = (Math.floor(Math.random() * Math.floor(20)) > 18) ? 'rickrolled' : args[0]
        if (!fs.existsSync(path.join(__dirname, '..', 'sounds', sound + '.mp3'))) {
          message.channel.send('Sound does not exists !')
        } else {
          const url2play = `${url}/${sound}.mp3`
  
          const player = createAudioPlayer()
          const resource = createAudioResource(url2play)
          player.play(resource)
          connection.subscribe(player)

          if (sound === 'rickrolled') message.channel.send('You\'ve been RICKROLLED !')

          player.on(AudioPlayerStatus.Playing, () => {
            message.client.user.setActivity('SimpleSoundBoard', { type: 'LISTENING' })
          })
          player.on('error', () => {
            message.channel.send('Je n\'ai pas réussi à lire ce son :(')
            player.stop()
            connection.destroy()
          })
          player.on(AudioPlayerStatus.Idle, () => {
            player.stop()
            connection.destroy()
          })
        }
      }
    } else {
      message.reply('You need to join a voice channel first!')
    }
  }
}
