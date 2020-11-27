const Discord = require('discord.js')
const { checkPermission, noPermissionMessage, successMessage, userError, getUserPermissionLevel } = require('../util/utils.js')
module.exports = {
	name: 'remove',
    description: 'remove a database value',
    args: true,
	execute(client,message,args) {
        if(args.length > 3) return userError(message, `Too many arguments! {prefix}remove {word}`)
        switch(args[1].toLowerCase()){
            case "word":
                let word = args[2].toLowerCase().replace(/[^A-Za-z0-9]+/g,"")
                if(!checkPermission(client,message, 1)) return noPermissionMessage(message)

                let existquery = `SELECT EXISTS (SELECT word FROM ${client.dbConf.blacklistedWordsTbl} WHERE word = ? LIMIT 1)`
                let existstmt = client.db.prepare(existquery)
                let existres = existstmt.get(word)
                if(existres[Object.keys(existres)[0]] === 0) return userError(message, "Word not on blacklist!")

                let removeQuery = `DELETE FROM ${client.dbConf.blacklistedWordsTbl} WHERE word = :word`
                let removeStmt = client.db.prepare(removeQuery)
                removeStmt.run({word: word})
                successMessage(message, `Blacklisted word removed`)
                break;
            case "bypass":
                let bypassID = args[2]

                if(bypassID.length !== 18) return message.channel.send("Invalid ID")
                if(/[^0-9]/.test(bypassID)) return message.channel.send("ID must be numbers only")

                if(!checkPermission(client,message, 2)) return noPermissionMessage(message)
                let bypassExistsQuery = `SELECT EXISTS (SELECT id FROM ${client.dbConf.bypassTbl} WHERE id = ? LIMIT 1)`
                let bypassExistsStmt = client.db.prepare(bypassExistsQuery)
                let bypassExistsRes = bypassExistsStmt.get(bypassID)
                if(bypassExistsRes[Object.keys(bypassExistsRes)[0]] === 0) return message.channel.send(`Bypass already exists`)

                let bypassRemoveQuery = `DELETE FROM ${client.dbConf.bypassTbl} WHERE id = :id`
                let bypassRemoveStmt = client.db.prepare(bypassRemoveQuery)
                bypassRemoveStmt.run({id: bypassID})
                successMessage(message, `Bypass removed`)
                break;
            case "permission":
                let permissionID = args[2]

                if(permissionID.length !== 18) return message.channel.send("Invalid ID")
                if(/[^0-9]/.test(permissionID)) return message.channel.send("ID must be numbers only")

                if(!checkPermission(client,message, 3)) return noPermissionMessage(message)
                if(getUserPermissionLevel(client, message.member) <= getUserPermissionLevel(client, message.guild.members.cache.get(permissionID)) ) return noPermissionMessage(message)

                let permissionExistsQuery = `SELECT EXISTS (SELECT id FROM ${client.dbConf.permissionTbl} WHERE id = :id LIMIT 1)`
                let permissionExistsStmt = client.db.prepare(permissionExistsQuery)
                let permissionExistsRes = permissionExistsStmt.get({id: permissionID})
                if(permissionExistsRes[Object.keys(permissionExistsRes)[0]] === 0) return userError(message, `Permission does not exist`)

                let permissionRemoveQuery = `DELETE FROM ${client.dbConf.permissionTbl} WHERE id = :id`
                let permissionRemoveStmt = client.db.prepare(permissionRemoveQuery)
                permissionRemoveStmt.run({id: permissionID})
                successMessage(message, `Permissions removed`)
                break;
            default:
                userError(message, "Argument not recognised, did you spell it correctly? (word | bypass | permission)")
                break;
        }
    }
};