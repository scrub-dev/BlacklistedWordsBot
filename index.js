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
    let messageArr = message.content.toLowerCase().split(" ")
    if(messageArr.some(checkMessage)){
        if(bypassCheck(message)) return
        let response = responsesFile.responses[Math.floor(Math.random()*responsesFile.responses.length)]
        message.delete({reason:"Word on blacklist used"})
            .then(()=>{
                if(responsesFile.responseFlag) message.channel.send(`${message.member.user.username} ${response}`)
                else return
            }).catch(console.error)
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
    const roleCheck = (element) => Array.from(message.member.roles.cache.map(roles => `${roles.id}`)).includes(element)
    if(bypassesFile.channelBypass.includes(message.channel.id)) flag = true
    if(bypassesFile.roleBypass.some(roleCheck)) flag = true
    if(bypassesFile.userBypass.includes(message.member.id))flag = true
    return flag
}