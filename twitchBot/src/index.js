const tmi = require("tmi.js")

const client = new tmi.Client({
    options: {debug: true},
    identity: {
        username: "caninobot",
        password: "oauth:pe359ldpfcwo3856pv3t4986s7yxpb"
    },
    channels: ["caninobot"]
})

client.connect();

client.on('message', (channel, tags, message, self) => {
    //Paso toda la cadena a minuscula
    let msg = message.toLowerCase();

    if(msgClear.includes('!hola')) {
        //client.say(channel, 'Hola Universo')
        console.log(tags)
        let txt = ''
        if(!tags.subscriber) {
            txt = '. No te olvides de suscribirte con Amazon Prime'
        }
        client.say(channel, 'Hola ' + tags.username + txt)
    }

    //Filtro de insultos
    if (msg.includes('gordo') || msg.includes('gorda') || msg.includes('estupido')) {
        client.say(channel, tags.username + ' no se aceptan estas palabras en este stream.')
    }

    //Multiples respuestas
    let saludos = [
        'Que descanses ',
        'Que duermas bien ',
        'Que sueñes con los angelitos ',
        'Que no te falle el gallo '
    ]

    let random = 0

    if (msg.includes('buenas noches')) {
        random = Math.round(Math.random() * 4);
        client.say(channel, saludos[random] + tags.username)
    }
})