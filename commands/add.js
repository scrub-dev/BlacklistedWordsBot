const Discord = require('discord.js')
const { checkPermission, noPermissionMessage, successMessage, userError, getUserPermissionLevel } = require('../util/utils.js')
module.exports = {
	name: 'add',
    description: 'add a database value',
    args: true,
	execute(client,message,args) {
        switch(args[1].toLowerCase()){
            case "word":
                if(args.length < 5) return message.channel.send("Invalid amount of arugments (add word {word} {filtertype} {severity rating 1-3}")

                let wordTypeArray = ["DEFAULT", "DISCRIMINATION", "SEXUALCONTENT", "HOSTILILITY", "PROFANITY"]
                let word = args[2].toLowerCase().replace(/[^A-Za-z0-9]+/g,"")
                let wordType = args[3].toUpperCase()
                let severity = parseInt(args[4])

                if(!wordTypeArray.includes(wordType)) return message.channel.send("Invalid word filter type")
                if(severity > 3 || severity < 1 || isNaN(severity)) return message.channel.send("Invalid Word Severity filter (Must be between either 1, 2 or 3")

                if(!checkPermission(client,message, 1)) return noPermissionMessage(message)
                let existquery = `SELECT EXISTS (SELECT word FROM ${client.dbConf.blacklistedWordsTbl} WHERE word = ? LIMIT 1)`
                let existstmt = client.db.prepare(existquery)
                let existres = existstmt.get(word)
                if(existres[Object.keys(existres)[0]] !== 0) return userError(message, "Word alread in blacklist database")

                let addQuery = `INSERT INTO ${client.dbConf.blacklistedWordsTbl} VALUES (:word, :wordType, :wordSeverity)`
                let addStmt = client.db.prepare(addQuery)
                addStmt.run({
                    word: word,
                    wordType: wordType,
                    wordSeverity: severity
                })
                successMessage(message, `Blacklisted word added`)
                break;
            case "bypass":
                if(args.length < 4) return message.channel.send(`Incorrect amount of arguments (add bypass id type)`)

                let id = args[2]
                let bypassType = args[3].toUpperCase()
                let bypassTypeArray = ["USER", "CHANNEL", "ROLE"]

                if(!bypassTypeArray.includes(bypassType)) return message.channel.send("Invalid Bypass Type")
                if(id.length !== 18) return message.channel.send("Invalid ID")
                if(/[^0-9]/.test(id)) return message.channel.send("ID must be numbers only")

                if(!checkPermission(client,message, 2)) return noPermissionMessage(message)
                let bypassExistsQuery = `SELECT EXISTS (SELECT id FROM ${client.dbConf.bypassTbl} WHERE id = ? LIMIT 1)`
                let bypassExistsStmt = client.db.prepare(bypassExistsQuery)
                let bypassExistsRes = bypassExistsStmt.get(id)
                if(bypassExistsRes[Object.keys(bypassExistsRes)[0]] == 0) return message.channel.send(`Bypass does not exist`)

                let addBypassQuery = `INSERT INTO ${client.dbConf.bypassTbl} VALUES (:id,:bypassType)`
                let addBypassStmt = client.db.prepare(addBypassQuery)
                addBypassStmt.run({
                    id: id,
                    bypassType: bypassType
                })
                successMessage(message, `${args[3]} Bypass added for: ${id}`)
                break;
            case "permission":
                if(args.length < 4) return userError(message, `ncorrect amount of arguments (add permission id level)`)

                let permissionID = args[2]
                let permissionLevel = parseInt(args[3])

                if(permissionID.length !== 18) return userError(message, `Invalid ID`)
                if(/[^0-9]/.test(permissionID)) return userError(messasge, "ID must be numbers only")
                if(isNaN(permissionLevel)) return userError(message, `Invalid Level`)
                if(permissionLevel > 3) return userError(message, "User permission level too high, please pick 1,2 or 3")

                if(!checkPermission(client,message, 3)) return noPermissionMessage(message)
                if(getUserPermissionLevel(client, message) <= permissionLevel ) return noPermissionMessage(message)

                let permissionExistsQuery = `SELECT EXISTS (SELECT id FROM ${client.dbConf.permissionTbl} WHERE id = :id LIMIT 1)`
                let permissionExistsStmt = client.db.prepare(permissionExistsQuery)
                let permissionExistsRes = permissionExistsStmt.get({id: permissionID})
                if(permissionExistsRes[Object.keys(permissionExistsRes)[0]] !== 0) return userError(message, `Permission already exists`)

                let addPermissionQuery = `INSERT INTO ${client.dbConf.permissionTbl} VALUES (:id,:level)`
                let addPermissionStmt = client.db.prepare(addPermissionQuery)
                addPermissionStmt.run({
                    id: permissionID,
                    level: permissionLevel
                })
                successMessage(message, `Bot moderation level ${permissionLevel} added to ${client.users.cache.find(user => user.id === permissionID).username}`)
                break;
            default:
                userError(message, "Argument not recognised, did you spell it correctly? (word | bypass | permission)")
                break;
       }
    }
};