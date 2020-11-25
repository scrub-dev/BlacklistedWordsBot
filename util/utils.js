const Discord = require("discord.js");

module.exports.checkPermission = (client, message, level) => {
    if(message.member.hasPermission("ADMINISTRATOR")) return true;
    let permissionQuery = `SELECT id, permissionLevel FROM ${client.dbConf.permissionTbl} WHERE id  = :id LIMIT 1`
    let stmt = client.db.prepare(permissionQuery)
    let res = stmt.get({id: message.member.id})
    if(res == undefined) return false
    let flag = (res.permissionLevel >= level)? true : false
    return flag
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