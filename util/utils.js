const Discord = require("discord.js");

module.exports.checkPermission = (client, message, level) => {
    if(message.member.hasPermission("ADMINISTRATOR")) return true;
    let id = message.member.id
    let permissionQuery = `SELECT id, permissionLevel FROM ${client.dbConf.permissionTbl} WHERE id  = ? LIMIT 1`
    client.db.get(permissionQuery, [id], (err, row) => {
        if(err) throw err;
        if(!row.id) return false;
        if(row.permissionLevel < level) return false;
    })
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
    embed.setTitle('✅ Success! ✅').setDescription(`***Success!*** ${info}`).setColor("GREEEN");
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
        client.db.all(qry, (err,rows) => {
            if(err) throw err
            if(rows.length == 0) resolve(["0 Results"])
            else{
                resolve(rows)
            }
        })
    })

}