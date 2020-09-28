const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')

module.exports = {
  name: 'list',
  description: 'List sounds.',
  async execute (message, args) {
    if (!message.guild) return
    const files = fs.readdirSync(path.join(__dirname, '..', 'sounds'))
    files.sort((a, b) => a.localeCompare(b))
    let str = '' 
   
    let fields = {}

    files.forEach((element) => {
      const firstChart = element.charAt(0)
      if(!fields[firstChart]) fields[firstChart] = []
      fields[firstChart] = `${fields[firstChart]}, ${element.replace('.mp3', '')}`
    })
    // inside a command, event listener, etc.
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Sounds list')   
    .setAuthor('ddgll', 'Tucsale')
    .setDescription('Some description here')
    .addFields(fields)
    .setFooter('Copyright or not, that\'s the question ...');

    
    if (message.member.voice.channel) {
      message.channel.send(exampleEmbed)
    } else {
      message.reply(exampleEmbed)
    }
  }
}
