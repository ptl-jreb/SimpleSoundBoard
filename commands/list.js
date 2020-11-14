const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')
const categories = require('../categories.json')
const fields = {}
const fields2 = []
const fieldsCat = []

module.exports = {
  name: 'list',
  description: 'List sounds.',
  async execute (message, args) {
    if (!message.guild) return
    const files = fs.readdirSync(path.join(__dirname, '..', 'sounds'))
    files.sort((a, b) => a.localeCompare(b))
    // let str = ''

    files.forEach((element) => {
      if (element === 'rickrolled.mp3' || element === 'smb2.mp3') return
      const firstChart = element.charAt(0).toUpperCase()
      fields[firstChart] = !fields[firstChart] ? element.replace('.mp3', '') : `${fields[firstChart]}, ${element.replace('.mp3', '')}`
    })
    for (let key in fields) {
      fields2.push({ name: key, value: fields[key] })
    }

    const keys = Object.keys(categories).sort((a, b) => a.localeCompare(b))
    keys.forEach(k => {
      fieldsCat.push({ name: k, value: categories[k].sort((a, b) => a.localeCompare(b)).join(', ') })
    })

    // inside a command, event listener, etc.
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Liste des sons disponibles ! SPONIBLES !!')
      .setAuthor('ddgll | TucSale')
      .setDescription('')
      .addFields(fields2)
      .addFields(fieldsCat)
      .setFooter('Copyright or not, that\'s the question ...')

    if (message.member.voice.channel) {
      message.channel.send(exampleEmbed)
    } else {
      message.reply(exampleEmbed)
    }
  }
}
