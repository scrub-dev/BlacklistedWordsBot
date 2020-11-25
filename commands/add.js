const Discord = require('discord.js')
const { checkPermission } = require('../util/utils.js')
module.exports = {
	name: 'add',
    description: 'add a database value',
    args: true,
	execute(client,message,args) {
        switch(args[1].toLowerCase()){
            case "word":
                if(args.length < 5) return message.channel.send("Error: Invalid amount of arugments (add word {word} {filtertype} {severity rating 1-3}")

                let wordTypeArray = ["DEFAULT", "DISCRIMINATION", "SEXUALCONTENT", "HOSTILILITY", "PROFANITY"]
                let word = args[2].toLowerCase().replace(/[^A-Za-z0-9]+/g,"")
                let wordType = args[3].toUpperCase()
                let severity = parseInt(args[4])

                if(!wordTypeArray.includes(wordType)) return message.channel.send("Error: Invalid word filter type")
                if(severity > 3 || severity < 1 || isNaN(severity)) return message.channel.send("Error: Invalid Word Severity filter (Must be between either 1, 2 or 3")

                if(!checkPermission(client,message, 1)) return message.channel.send("Error: Insufficient permissions")
                let query = `SELECT EXISTS (SELECT word FROM ${client.dbConf.blacklistedWordsTbl} WHERE word = ? LIMIT 1)`
                client.db.get(query, [word], (err, row) =>{
                    if(err) throw err;
                    if(row[Object.keys(row)[0]] !== 0) return message.channel.send("Error: Word already in blacklist database")
                    let addQuery = `INSERT INTO ${client.dbConf.blacklistedWordsTbl} VALUES (?, ?, ?)`
                    client.db.run(addQuery,[word,wordType,severity], (err) =>{
                        if(err) console.log(`[ DB ]` + err)
                        console.log(`[ BOT ] DB ADD: WORD ${word} ${wordType} ${severity}`)
                    })
                })
                break;
            case "bypass":
                if(args.length < 4) return message.channel.send(`Error: Incorrect amount of arguments (add bypass id type)`)

                let id = args[2]
                let bypassType = args[3].toUpperCase()
                let bypassTypeArray = ["USER", "CHANNEL", "ROLE"]

                if(!bypassTypeArray.includes(bypassType)) return message.channel.send("Error: Invalid Bypass Type")
                if(id.length !== 18) return message.channel.send("Error: Invalid ID")
                if(/[^0-9]/.test(id)) return message.channel.send("Error: ID must be numbers only")

                if(!checkPermission(client,message, 2)) return message.channel.send("Error: Insufficient permissions")

                let bypassExistsQuery = `SELECT EXISTS (SELECT id FROM ${client.dbConf.bypassTbl} WHERE id = ? LIMIT 1)`
                client.db.get(bypassExistsQuery, [id], (err,row) =>{
                    if(err) throw err
                    console.log(row)
                    if(row[Object.keys(row)[0]] !== 0) return message.channel.send(`Error: Bypass already exists`)
                    let addBypassQuery = `INSERT INTO ${client.dbConf.bypassTbl} VALUES (?,?)`
                    client.db.run(addBypassQuery, [id, bypassType], (err) => {
                        if(err) throw err;
                        console.log(`[ BOT ] DB ADD: BYPASS ${bypassType} ${id}`)
                    })
                })
                break;
            case "permission":
                if(args.length < 4) return message.channel.send(`Error: Incorrect amount of arguments (add permission id level)`)

                let permissionID = args[2]
                let permissionLevel = parseInt(args[3])

                if(permissionID.length !== 18) return message.channel.send(`Error: Invalid ID`)
                if(/[^0-9]/.test(id)) return message.channel.send("Error: ID must be numbers only")
                if(isNaN(permissionLevel)) return message.channel.send(`Error: Invalid Level`)
                if(permissionLevel > 4) return message.channel.send("Error: User permission level too high, please pick 1,2,3 or 4.")

                if(!checkPermission(client,message, 3)) return message.channel.send("Error: Insufficient permissions")

                let permissionExistsQuery = `SELECT EXISTS (SELECT id FROM ${client.dbConf.permissionTbl} WHERE id = ? LIMIT 1)`
                client.db.get(permissionExistsQuery,[permissionID], (err,row) => {
                    if(err) throw err
                    if(row[Object.keys(row)[0]] !== 0) return message.channel.send(`Error: Permission already exists`)
                    let addPermissionQuery = `INSERT INTO ${client.dbConf.permissionTbl} VALUES (?,?)`
                    client.db.run(addPermissionQuery,[permissionID,permissionLevel], (err) => {
                        if(err) throw err
                        console.log(`[ BOT ] DB ADD: PERMISSIONS LEVEL: ${permissionLevel} ID: ${permissionID}`)
                    })   
                })
                break;
       }
    }
};