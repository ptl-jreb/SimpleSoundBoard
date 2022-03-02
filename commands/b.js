const { blaguesApiToken } = require('../config.json')

const Discord = require('discord.js')
const BlaguesAPI = require('blagues-api')

const blagues = new BlaguesAPI(blaguesApiToken)

// https://github.com/Blagues-API/blagues-api/blob/dev/src/typings.ts
const categories = {
  list: 'Affiche ce message',
  global: 'Tout public',
  dark: 'Humour noir',
  dev: 'Blague de dev',
  limit: 'Blague 18+',
  beauf: 'Humour beauf',
  blondes: 'Blagues de blondes'
}

module.exports = {
  name: 'b',
  description: 'Tell a joke',
  async execute (message, args) {
    if (!message.guild) return

    const category = args[0]

    let blague = null
    if (category) {
      const exists = Object.keys(categories).includes(category)
      if (exists) {
        if (category === 'list') {
          const listEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Liste des catégories de blagues')
            .setDescription('')
            .addFields(categories.map((id, desc) => {
              return { name: id, value: desc }
            }))

          message.channel.send(listEmbed)
        } else {
          blague = await blagues.randomCategorized(category)
        }
      } else {
        message.channel.send('Catégorie inconnue !')
      }
    } else {
      blague = await blagues.random()
    }

    if (blague) {
      message.channel.send('/tts ' + blague.joke)
      setTimeout(() => {
        message.channel.send('/tts ' + blague.answer)
      }, 3000)
    }
  }
}
