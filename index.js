const Discord = require('discord.js')
const fs = require('fs')
const config = require('./util/config.json')
const blacklistFile = require('./util/blacklist.json')
const bypassesFile = require('./util/bypasses.json')
const responsesFile = require('./util/responses.json')

let client = new Discord.Client()
client.login(config.bot.token)
client.on('ready', ()=>{
    console.log(`${config.bot.botName} v${config.bot.botVer} running on\n${client.user.username}#${client.user.discriminator} is online!!!`)
})
client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)){
        let messageArr = message.content.toLowerCase().trim().split(/ +/)
        if(messageArr.some(checkMessage)){
            if(bypassCheck(message)) return
            let response = responsesFile.responses[Math.floor(Math.random()*responsesFile.responses.length)]
            message.delete({reason:"Word on blacklist used"})
                .then(()=>{
                    if(responsesFile.responseFlag) message.channel.send(`${message.member.user.username} ${response}`)
                    else return
                }).catch(console.error)
        }
    }

    let args = message.content.slice(config.prefix.length).trim().split(/ +/);
    let command = args[0]
    client.commands = new Discord.Collection();
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
    for(let file of commandFiles){
        const comand = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    }
    if(!client.commands.has(command)) return
    try{
        client.commands.get(command).execute(message,args)
    }catch(error)
    {
        console.error(error)
        message.channel.send('An Error has occured: Please check the console for more details')
    }
})
function checkMessage(message){
    let flag = false
    blacklistFile.words.forEach(element => {
        if(message == element) flag = true
    });
    return flag
}
function bypassCheck(message){
    let flag = false
    if(bypassesFile.channelBypass.includes(message.channel.id)) flag = true
    if(bypassesFile.roleBypass.some(element => Array.from(message.member.roles.cache.map(roles => `${roles.id}`)).includes(element))) flag = true
    if(bypassesFile.userBypass.includes(message.member.id))flag = true
    return flag
}

setInterval(()=>{
    let activities = ["Trans Rights", "On the belong server"]
    let num = Math.floor(Math.random() * activities.length)
    client.user.setActivity(activities[num],{type: "PLAYING"})
}, 1000 * 60 * 5) //(5 Minutes)