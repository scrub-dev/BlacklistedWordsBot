const Discord = require('discord.js')
const { userError, returnTable, embedOutput, checkPermission, noPermissionMessage } = require('../util/utils.js')
module.exports = {
	name: 'list',
    description: 'list current blacklisted words',
    args: true,
	execute(client,message,args) {
        let name = args[1].toString().charAt(0).toUpperCase() + args[1].slice(1)
        let output = "0 Results"
        switch(args[1].toLowerCase()){
            case "word":
            case "words":
                if(!checkPermission(client,message, 1)) return noPermissionMessage(message);
                returnTable(client, client.dbConf.blacklistedWordsTbl).then((rows)=>{
                    if(rows.length !== 0){
                        output = ""
                        rows.forEach((row) => {
                            output += `${row.word.charAt(0).toUpperCase() + row.word.slice(1)} ${row.blacklistType.charAt(0) + row.blacklistType.slice(1).toLowerCase()} ${row.severityLevel}\n`
                        })
                    }
                    embedOutput(message, name, output)
                })
                break;
            case "bypass":
            case "bypasses":
                if(!checkPermission(client,message, 2)) return noPermissionMessage(message)
                returnTable(client, client.dbConf.bypassTbl).then((rows)=>{
                    if(rows.length !== 0){
                        output = ""
                        rows.forEach((row) => {
                            output += ` ${row.bypassType.charAt(0) + row.bypassType.slice(1).toLowerCase()} ${row.id}\n`
                        })
                    }
                    embedOutput(message, name, output)
                })
                break;
            case "permission":
            case "permissions":
                if(!checkPermission(client,message, 3)) return noPermissionMessage(message)
                returnTable(client, client.dbConf.permissionTbl).then((rows)=>{
                    output = ""
                    let hiddenAdminUsers = client.users.cache.filter(user => message.guild.member(user).hasPermission("ADMINISTRATOR") && !user.bot) // Will always be 1, Owner of server
                    hiddenAdminUsers.each(user => {
                        output += `${user.username}#${user.discriminator} 4\n`
                    })
                    if(rows.length !== 0){
                        rows.forEach((row) => {
                            if(!hiddenAdminUsers.get(row.id)){
                                let permissionUser = client.users.cache.find(user => user.id === row.id)
                                output += `${permissionUser.username}#${permissionUser.discriminator} ${row.permissionLevel}\n`
                            }
                        }) 
                    }
                    embedOutput(message, name, output)
                })
                break;
            case "botoptions":
            case "botoption":
            case "options":
                if(!checkPermission(client,message, 3)) return noPermissionMessage(message)
                returnTable(client, "botConfig").then((rows) => {
                    output = ""
                    rows.forEach(element => {
                        output += `${element.name.charAt(0).toUpperCase() + element.name.slice(1).toLowerCase()} : ${element.value}\n`
                    })
                    embedOutput(message, "Bot Options", output)
                })
                break;
            default:
                userError(message, "Argument not recognised, did you spell it correctly? (word | bypass | permission)")
                return;
        }
    }
};