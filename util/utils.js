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