const ytdl = require('ytdl-core')

module.exports = {
  name: 'ys',
  description: 'Play youtube sound.',
  async execute (message, args, servers) {
    if (!message.guild) return

    const play = (connection, message) => {
      const server = servers[message.guild.id]
      server.dispatcher = connection.playStream(ytdl(server.queue[0], { filter: "audioonly" }))

      server.queue.shift()

      server.dispatcher.on('end', () => {
        if (server.queue[0]) return play(connection, message)
        connection.disconnect()
      })
    }

    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join()

      if (!args[1]) message.channel.send('You need to provide a link!')
      const link = args[1]

      if (!servers[message.guild.id]) servers[message.guild.id] = { queue: [] }
      const server = servers[message.guild.id]

      server.queue.push(link)

      play(connection, message)
    } else {
      message.reply('You need to join a voice channel first!')
    }
  }
}
