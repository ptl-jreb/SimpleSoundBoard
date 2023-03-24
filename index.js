const fs = require('fs')
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js')

const { prefix, token } = require('./config.json')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
})
client.commands = new Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

const servers = {}

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.once(Events.ClientReady, () => {
  console.log('Ready!')
})

client.on(Events.MessageCreate, message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

  if (!client.commands.has(command)) return

  try {
    client.commands.get(command).execute(message, args, servers)
  } catch (error) {
    console.error(error)
    message.reply("Une erreur s'est produite pendant l'exécution de la commande !")
  }
})

client.login(token)
