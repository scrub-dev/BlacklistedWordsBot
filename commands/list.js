const Discord = require('discord.js')
const { userError, returnTable, embedOutput, checkPermission, noPermissionMessage } = require('../util/utils.js')
module.exports = {
	name: 'list',
    description: 'list current blacklisted words',
    args: true,
	execute(client,message,args) {
        let name = args[1].toString().charAt(0).toUpperCase() + args[1].slice(1)
        let listTable = ""
        let output = ""
        switch(args[1].toLowerCase()){
            case "word":
            case "words":
                if(!checkPermission(client,message, 1)) return noPermissionMessage(message)
                returnTable(client, client.dbConf.blacklistedWordsTbl).then((rows)=>{
                    rows.forEach((row) => {
                        output += `${row.word.charAt(0).toUpperCase() + row.word.slice(1)} ${row.blacklistType.charAt(0) + row.blacklistType.slice(1).toLowerCase()} ${row.severityLevel}\n`
                    })
                    embedOutput(message, name, output)
                })
                break;
            case "bypass":
            case "bypasses":
                if(!checkPermission(client,message, 2)) return noPermissionMessage(message)
                returnTable(client, client.dbConf.bypassTbl).then((rows)=>{
                    rows.forEach((row) => {
                        output += ` ${row.bypassType.charAt(0) + row.bypassType.slice(1).toLowerCase()} ${row.id}\n`
                    })
                    embedOutput(message, name, output)
                })
                break;
            case "permission":
            case "permissions":
                if(!checkPermission(client,message, 3)) return noPermissionMessage(message)
                returnTable(client, client.dbConf.permissionTbl).then((rows)=>{
                    rows.forEach((row) => {
                        output += `${client.users.cache.find(user => user.id === row.id).username} ${row.permissionLevel}\n`
                    })
                    embedOutput(message, name, output)
                })
                break;
            default:
                userError(message, "Argument not recognised, did you spell it correctly? (word | bypass | permission)")
                return;
        }
    }
};