module.exports = {
  name: 's',
  description: 'Stop youtube sound.',
  async execute (message, args, servers) {
    if (!message.guild) return
    const server = servers[message.guild.id]
    if (message.member.voice.channel) {
      for (let i = server.queue.length - 1; i >= 0; i--) {
        server.queue.splice(i, 1)
      }
      server.dispatcher.end()
      message.channel.send('Ending the queue leaving the voice channel!')
      console.log('stopped the queue')
    }

    if (message.guild.connection) message.member.voice.channel.leave()
  }
}
