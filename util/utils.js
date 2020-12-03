const Discord = require("discord.js");

module.exports.getUserPermissionLevel = (client, member) => {
    if(member.hasPermission("ADMINISTRATOR")) return 4
    let permissionQuery = `SELECT id, permissionLevel FROM ${client.dbConf.permissionTbl} WHERE id = :id LIMIT 1`
    let stmt = client.db.prepare(permissionQuery)
    let res = stmt.get({id: member.id})
    if(res === undefined) return 0
    else return res.permissionLevel
}

module.exports.checkPermission = (client, message, level) => {
    let flag = (this.getUserPermissionLevel(client,message.member) >= level)? true : false
    return flag
}

module.exports.getCurrentTableEntry = (client,table,tableVal,value) => {
    let query = `SELECT * FROM ${table} WHERE ${tableVal} = :x `
    let stmt = client.db.prepare(query)
    let res = stmt.get({x: value})
    return res
}

module.exports. randomArrayReturn = (resArr) => {
    return resArr[Math.floor(Math.random()*resArr.length)]
}

module.exports.noPermissionMessage = (message) => {
    let embed = new Discord.MessageEmbed();
    embed.setTitle('❌ ERROR ❌').setDescription("***You don't have permission to use this command***").setColor("RED");
    message.channel.send(embed)
};
module.exports.successMessage = (message, info) => {
    let embed = new Discord.MessageEmbed();
    embed.setTitle('✅ Success! ✅').setDescription(`***Success!*** ${info}`).setColor("GREEN");
    message.channel.send(embed)
}
module.exports.userError = (message, info) => {
    let embed = new Discord.MessageEmbed();
    embed.setTitle('❌ ERROR ❌').setDescription(`***Error*** ${info}`).setColor("RED");
    message.channel.send(embed)
}
module.exports.embedOutput = (message, title, description) => {
    if(description.length > 2048){
        let descriptionOverflow = description.slice(2047)
        description = description.substring(0, 2048)
        this.embedOutput(message, title, descriptionOverflow)
    }
    let embed = new Discord.MessageEmbed();
    embed.setTitle(title).setDescription(description).setColor("ORANGE");
    message.channel.send(embed)    
}

module.exports.returnTable = async (client, table) => {
    return new Promise (resolve => {
        let qry = `SELECT * FROM ${table}`
        let stmt = client.db.prepare(qry)
        let res = stmt.all()
        resolve (res)
    })
}

module.exports.getTableRowCount = (db, table) => {
    let stmt = db.prepare(`SELECT * FROM ${table}`)
    let res = stmt.all()
    return res.length
}
module.exports.regexStringBuilder = (word) => {
    let wordArr = word.split("")
    let x = ""
    wordArr.forEach(e => {
        x += `[${e}]+`
    })
    return x
}

module.exports.removeDuplicateCharacters = (word) => {
    return word.toLowerCase().replace(/(.)\1+/g, '$1')
}