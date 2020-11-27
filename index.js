const Discord = require('discord.js')
const fs = require('fs')
const config = require('./util/config.json')
const responsesFile = require('./util/responses.json')
const Database = require('better-sqlite3')
const dbConf = config.database
var db;

const { randomArrayReturn, getTableRowCount } = require('./util/utils.js')
require('dotenv').config()
/**
 * TODO:
 * create a server settings json file to store persistant data for server (Could just include in config.json)
 *  > Server moderation level for all blacklistTypes
 *  > If the server wants responses when the message is removed by the bot
 *  > If the server wants to audit log every message deletion
 * implement a json file for the setActivity Function
 * implement word severity check agaist server settings table
 * 
 * Down the line:
 * Weighted 1337 Symbol detection
 *  > Check if the flagged word substitutes similar symbols ie: # = H, 7 = T, 3 = E etc.
 */
let client = new Discord.Client()
let token = process.env.TOKEN || config.bot.token
client.login(token)
try{
    if(!fs.existsSync(`./dbs/${dbConf.databaseName}.db`)){
        console.log(`[ INI ] Creating Database File`)
        fs.writeFileSync(`./dbs/${dbConf.databaseName}.db`, "")
    }
    console.log(`[ INI ] Connected to Database: ./dbs/${dbConf.databaseName}.db`)
    db = new Database(`./dbs/${dbConf.databaseName}.db`)
    db.pragma('journal_mode = WAL');
    db.exec(`CREATE TABLE IF NOT EXISTS ${dbConf.blacklistedWordsTbl} (word TEXT, blacklistType TEXT, severityLevel INT)`)
    db.exec(`CREATE TABLE IF NOT EXISTS ${dbConf.bypassTbl} (id TEXT, bypassType TEXT)`)
    db.exec(`CREATE TABLE IF NOT EXISTS ${dbConf.permissionTbl} (id TEXT, permissionLevel INT)`)
    //word: word you want to be blocked blaclistType: "DEFAULT" | "DISCRIMINATION" | "SEXUALCONTENT" | "HOSTILILITY" | "PROFANITY" severityLevel: 0-3 | How much filtering.
    //id: channelID | roleID | userID bypassType: "USER" | "CHANNEL" | "ROLE".
    /**
     * Permission Levels:
     * 1: CRUD words from blacklist
     * 2: CRUD bypasses
     * 3: CRUD permission levels 1 and 2
     * 4: CRUD permission levels 1, 2 and 3 (Cannot Assign, user must have admin flag set)
     */
}catch(error){
    console.log(`[ERROR] Database: ${error}`)
}
//Load Commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for(let i = 0; i < commandFiles.length; i++){
    let file = commandFiles[i]
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
    console.log(`[ INI ] Loading Command (${i + 1}/${commandFiles.length}) - ${file}`)
}
client.on('ready', ()=>{
    console.log(`[ INI ] ${config.bot.botName} v${config.bot.botVer}\n[ INI ] ${client.user.username}#${client.user.discriminator} is online!!!`)
    // let stmt_blacklistWordsCheck = db.prepare(`SELECT * FROM ${dbConf.blacklistedWordsTbl}`)
    // let res_blacklistWordsCheck = stmt_blacklistWordsCheck.all()
    // if(res_blacklistWordsCheck.length == 0) console.log(`[ INI ] No Blacklisted words found`)
    // else console.log(`[ INI ] DB: ${res_blacklistWordsCheck.length} Blacklisted words detected`)
    let blacklistedWordsRowCount = getTableRowCount(db, dbConf.blacklistedWordsTbl)
    if(blacklistedWordsRowCount !== 0) console.log(`[ INI ] ${blacklistedWordsRowCount} Blacklisted words detected`)
    else console.log(`[ INI ] No Blacklisted words found`)

    let bypassesRowCount = getTableRowCount(db, dbConf.bypassTbl)
    if(bypassesRowCount !== 0) console.log(`[ INI ] ${bypassesRowCount} Bypasses detected`)
    else console.log(`[ INI ] No Bypasses found`)

    let permissionsRowCount = getTableRowCount(db, dbConf.permissionTbl)
    if(permissionsRowCount !== 0 ) console.log(`[ INI ] ${permissionsRowCount} Bot permissions found`)
    else console.log(`[ INI ] No permissions detected`)
})
client.on('message', async message =>{
    if(message.author.bot) return;
    await checkMessage(message).then(flag => {
        if(!flag) return;
        deleteMessage(message, "Blacklisted Word")
        if(config.flags.responses) message.channel.send(randomArrayReturn(responsesFile.responses))

    })
    if(!message.content.startsWith(config.prefix)) return;
    let args = message.content.slice(config.prefix.length).trim().split(/ +/);
    let command = args[0]
    client.db = db
    client.dbConf = dbConf
    if(!client.commands.has(command)) return;
    try{
        if(!message.content.startsWith(config.prefix)) return;
        client.commands.get(command).execute(client,message,args)
    }catch(error){
        console.error(error)
        message.channel.send('An Error has occured: Please check the console for more details')
    }
})
async function checkMessage(message){
    return new Promise(resolve =>{
        let messageArr = message.content.toLowerCase().trim().split(/ +/)
        bypassCheck(message).then(flag => {
            if(flag) resolve(false);
            else{
                checkBlacklist(messageArr).then(flag2 => {
                    resolve(flag2)
                })
            }
        })
    })
}
async function checkBlacklist(wordArr){
    return new Promise(resolve => {
        let flag = false
        wordArr.forEach((element, index) => {
            let qry = `SELECT EXISTS (SELECT word FROM ${dbConf.blacklistedWordsTbl} WHERE word = :word LIMIT 1)`
            let stmt = db.prepare(qry)
            let res = stmt.get({word : element})
            if(res[Object.keys(res)[0]] != 0) flag = true
            if(index == wordArr.length - 1) resolve(flag)
        })
    })
} 
async function deleteMessage(message, reason){
    message.delete({reason: reason})
    .catch(console.error);
}
async function bypassCheck(message){
    return new Promise(resolve => {
        let flag = false
        let idArray = []
        idArray.push(message.member.id)
        idArray.push(message.channel.id)
        Array.from(message.member.roles.cache.map(roles => `${roles.id}`)).forEach(element =>{
        idArray.push(element)
        })
        idArray.forEach((element, index) => {
            let qry = `SELECT EXISTS (SELECT id FROM ${dbConf.bypassTbl} WHERE id = :id LIMIT 1)`
            let stmt = db.prepare(qry)
            let res = stmt.get({id: element})
            if(res[Object.keys(res)[0]] != 0 ) flag = true
            if(index == idArray.length - 1) resolve(flag)
        })
    })
}
setInterval(()=>{
    if(config.flags.activities){
        let activities = ["Trans Rights", "On the belong server"]
        let num = Math.floor(Math.random() * activities.length)
        client.user.setActivity(activities[num],{type: "PLAYING"})
    }
}, 1000 * 60 * 5)