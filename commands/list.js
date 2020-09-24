module.exports = {
  name: 'list',
  description: 'List sounds.',
  async execute (message, args) {
    if (!message.guild) return

    message.reply('wow coucou zizi sad')
  }
}
