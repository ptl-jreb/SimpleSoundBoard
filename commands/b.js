const { blaguesApiToken } = require('../config.json')

const Discord = require('discord.js')
const BlaguesAPI = require('blagues-api')

const blagues = new BlaguesAPI(blaguesApiToken)

// https://github.com/Blagues-API/blagues-api/blob/dev/src/typings.ts
const categories = [
  { name: 'list', value: 'Affiche ce message' },
  { name: 'global', value: 'Tout public' },
  { name: 'dark', value: 'Humour noir' },
  { name: 'dev', value: 'Blague de dev' },
  { name: 'limit', value: 'Blague 18+' },
  { name: 'beauf', value: 'Humour beauf' },
  { name: 'blondes', value: 'Blagues de blondes' }
]

module.exports = {
  name: 'b',
  description: 'Tell a joke',
  async execute (message, args) {
    if (!message.guild) return

    const category = args[0]

    let blague = null
    if (category) {
      const exists = categories.some(c => c.name === category)
      if (exists) {
        if (category === 'list') {
          const listEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Liste des catégories de blagues')
            .setDescription('')
            .addFields(categories)

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
      message.channel.send(`${blague.joke}\n\n\n\n\n${blague.answer}`, { tts: true })
    }
  }
}
