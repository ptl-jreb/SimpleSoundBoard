const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')
let fields = {}
let fields2 = []

module.exports = {
  name: 'list',
  description: 'List sounds.',
  async execute (message, args) {
    if (!message.guild) return
    const files = fs.readdirSync(path.join(__dirname, '..', 'sounds'))
    files.sort((a, b) => a.localeCompare(b))
    // let str = ''

    files.forEach((element) => {
      const firstChart = element.charAt(0).toUpperCase()
      if(!fields[firstChart]) fields[firstChart] = element.replace('.mp3', '')
      else fields[firstChart] = `${fields[firstChart]}, ${element.replace('.mp3', '')}`
    })
    for (let key in fields) {
      fields2.push({name:key, value:fields[key]})
    }
    
    console.log(fields2)
    // inside a command, event listener, etc.
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Sounds list')
      .setAuthor('ddgll | TucSale')
      .setDescription('Some description here')
      .addFields(fields2)
      .setFooter('Copyright or not, that\'s the question ...');


    if (message.member.voice.channel) {
      message.channel.send(exampleEmbed)
    } else {
      message.reply(exampleEmbed)
    }
  }
}
