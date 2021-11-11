const Discord = require('discord.js')
let bere = 722596611607232552
let botcanino = '908148980578398238'
const welcomeChannel = '908160091583283250'
const client = new Discord.Client({})
client.login('OTA4MTQ4OTgwNTc4Mzk4MjM4.YYxhpQ.c6KnztefpvDShWDXKHLbU7lN5SE')

client.on('ready',() => {
    console.log('Esta todo OK')
});

client.on('message', (msg) => {
    let message = msg.content.toLowerCase()
    console.log(msg.channel.name + ': ' + msg.author.username + ' dijo:' + msg.content)

    // Mensaje de bienvenida cuando se une un miembro a la comunidad
    client.on('guildMemberAdd', (member) => {
        const channel = member.guild.channels.cache.get(welcomeChannel)
        const txt = `Hola, <@${member.id}> espero que pases un muy buen tiempo en esta comunidad. Bienvenidx!`
        channel.send(txt)
    })

    if (msg.author.id !== botcanino) {
        // Respuesta automatica con mención
        if (message == '!botcanino') {
            if (msg.author.id == bere) {
                msg.reply('Hola creadora')
            } else {
                msg.reply('Hola como estas?')
            }
        }

        // Envío de mensaje privado
        if (message === 'ping') {
            client.users.fetch(msg.author.id)
            .then((user) => {
                user.send('pong')
            })
        }

        // Respuesta sin mención
        if (message.includes('clima')) {
            msg.channel.send('El clima esta muy loco')
        }

        // Conductual
        if (msg.content.includes('estupido') ||
            msg.content.includes('tarado') ||
            msg.content.includes('gordo')
        ) {
            msg.delete({
                timeout: 1000
            })
            msg.reply('No aceptamos esos tratos en esta comunidad. Ojo! Que te baneo :)')
        }
    }
})