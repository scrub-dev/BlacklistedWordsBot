const Discord = require('discord.js')
const config = require('./config.json')
const blacklist = require('./blacklist.json')

let client = new Discord.Client()
client.login(config.bot.token)
client.on('ready', ()=>{
    console.log(`${config.bot.botName} v${config.bot.botVer} running on\n${client.user.username}#${client.user.discriminator} is online!!!`)
    let blackList = ""
    blacklist.words.forEach(element => {
        blackList += element + " "
    })
})
client.on('message', async message =>{
    let messageArr = message.content.toLowerCase().split(" ")
    if(messageArr.some(checkMessage)){
        if(bypassCheck(message)) return
        let responses = ['says Scrub is the best','is telling you tsg needs a neon sign']
        let response = responses[Math.floor(Math.random()*responses.length)]
        message.delete({reason:"Word on blacklist used"})
            .then(()=>{
                message.channel.send(`${message.member.user.username} ${response}`)
            }).catch(console.error)
    }
})
function checkMessage(message){
    let flag = false
    blacklist.words.forEach(element => {
        if(message == element) flag = true
    });
    return flag
}
function bypassCheck(message){
    let flag = false
    const roleCheck = (element) => Array.from(message.member.roles.cache.map(roles => `${roles.id}`)).includes(element)
    if(config.bypasses.channelBypass.includes(message.channel.id)) flag = true
    if(config.bypasses.roleBypass.some(roleCheck)) flag = true
    if(config.bypasses.userBypass.includes(message.member.id))flag = true
    return flag
}