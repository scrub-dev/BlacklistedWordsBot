const Discord = require('discord.js')
const fs = require('fs')
const config = require('./util/config.json')
const blacklistFile = require('./util/blacklist.json')
const bypassesFile = require('./util/bypasses.json')
const responsesFile = require('./util/responses.json')
const privConfig = require('./priv/privConfig.json')
//const SQL = require ('sql-template-strings')

const sqlite3 = require('sqlite3').verbose()
//const sqlite = require('sqlite')
const dbConf = config.database
var db;

let client = new Discord.Client()
let token = fs.existsSync('./priv/privConfig.json') ? privConfig.token : config.bot.token
client.login(token)



//Database Stuff
try{
    if(!fs.existsSync(`./dbs/${dbConf.databaseName}.db`)){
        console.log(`[ INI ] Creating Database File`)
        fs.writeFileSync(`./dbs/${dbConf.databaseName}.db`, "")
    }
    console.log(`[ INI ] Connected to Database: ./dbs/${dbConf.databaseName}.db`)
    db = new sqlite3.Database(`./dbs/${dbConf.databaseName}.db`)
    db.exec(`CREATE TABLE IF NOT EXISTS ${dbConf.blacklistedWordsTbl} (word TEXT, blacklistType TEXT, severityLevel INT)`)
    db.exec(`CREATE TABLE IF NOT EXISTS ${dbConf.bypassTbl} (id INT, bypassType TEXT)`)
    //word: word you want to be blocked blaclistType: "DEFAULT" | "DISCRIMINATION" | "SEXUALCONTENT" | "HOSTILILITY" | "PROFANITY" severityLevel: 0-3 | How much filtering.
    //id: channelID | roleID | userID bypassType: "USER" | "CHANNEL" | "ROLE".
}catch(error){
    console.log(`[ERROR] Database: ${error}`)
}
/**
 *         async () => open({
            filename: `./dbs/${config.database.blacklistedWords}.db`,
            driver: sqlite3.Database
          }).then((db) => {
            console.log(`[ BOT ] Database location: ./dbs/${config.database.blacklistedWords}.db`)
            awaitdb.exec(`CREATE TABLE ${dbConf.blacklistedWordsTbl} (word TEXT, blacklistType TEXT, severityLevel INT)`)
          })
          db.all(`SELECT * FROM ${dbConf.blacklistedWordsTbl}`, (err, rows) => {
if(err) throw err;
rows.forEach((row) => {
console.log(`[ DB ] ${row.word}` )
})
})
 */


client.on('ready', ()=>{
    console.log(`[ INI ] ${config.bot.botName} v${config.bot.botVer}\n[ INI ] ${client.user.username}#${client.user.discriminator} is online!!!`)
    db.all(`SELECT * FROM ${dbConf.blacklistedWordsTbl}`, (err, rows) =>{
        if(err) throw err;
        if(rows.length == 0) console.log(`[ INI ] No Blacklisted words found`)
        else console.log(`[ INI ] DB: ${rows.length} Blacklisted words detected`)
    })
    db.all(`SELECT * FROM ${dbConf.bypassTbl}`, (err, rows) =>{
        if(err) throw err;
        if(rows.length == 0) console.log(`[ INI ] No Bypasses found`)
        else console.log(`[ INI ] DB: ${rows.length} Bypasses detected`)
    })
})

//Load Commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for(let i = 0; i < commandFiles.length; i++){
    let file = commandFiles[i]
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
    console.log(`[ INI ] Loading Command (${i + 1}/${commandFiles.length}) - ${file}`)
}

client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)){
        let messageArr = message.content.toLowerCase().trim().split(/ +/)
        messageArr.forEach(x => checkMessage(x).then(flag => {
            if(flag[Object.keys(flag)[0]]){
                if(bypassCheck(message)) return
                let response = responsesFile.responses[Math.floor(Math.random()*responsesFile.responses.length)]
                message.delete({reason:"Word on blacklist used"})
                    .then(()=>{
                        if(responsesFile.responseFlag) message.channel.send(`${message.member.user.username} ${response}`)
                        else return
                    }).catch(console.error)
            }
        }))
    }

    let args = message.content.slice(config.prefix.length).trim().split(/ +/);
    let command = args[0]
    client.db = db
    client.dbConf = dbConf
    if(!client.commands.has(command)) return
    try{
        if(!message.content.startsWith(config.prefix)) return
        client.commands.get(command).execute(client,message,args)}catch(error)
    {
        console.error(error)
        message.channel.send('An Error has occured: Please check the console for more details')
    }
})
async function checkMessage(wordSent){
    let flag = false
    /*blacklistFile.words.forEach(element => {
        if(message == element) flag = true
    });*/
    return new Promise(resolve => {
        let query = `SELECT EXISTS (SELECT word FROM ${dbConf.blacklistedWordsTbl} WHERE word = ? LIMIT 1)`
        db.get(query,[wordSent], (err, row) =>{
            if(err) throw err;
            flag = row[Object.keys(row)[0]] != 0 ? true : false
            resolve({flag: flag})
        })
    })
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