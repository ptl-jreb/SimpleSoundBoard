const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')
const categories = require('../categories.js')
const fields = {}
const fields2 = []

module.exports = {
  name: 'list',
  description: 'List categories.',
  async execute (message, args) {
    if (!message.guild) return
    const keys = Object.keys(categories)
    keys.sort((a, b) => a.localeCompare(b))

    keys.forEach((element) => {
      fields[element] = categories[element].sort((a, b) => a.localeCompare(b))
    })
    for (let key in fields) {
      fields2.push({ name: key, value: fields[key] })
    }

    // inside a command, event listener, etc.
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Liste des catégories disponibles ! SPONIBLES !!')
      .setAuthor('ddgll | TucSale')
      .setDescription('')
      .addFields(fields2)
      .setFooter('Copyright or not, that\'s the question ...')

    if (message.member.voice.channel) {
      message.channel.send(exampleEmbed)
    } else {
      message.reply(exampleEmbed)
    }
  }
}
