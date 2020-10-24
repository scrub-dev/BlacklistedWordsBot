const Discord = require('discord.js')
module.exports = {
	name: 'add',
    description: 'add',
    args: true,
	execute(client,message,args) {
        switch(args[1].toLowerCase()){
            case "word":
                let wordTypeArray = ["DEFAULT", "DISCRIMINATION", "SEXUALCONTENT", "HOSTILILITY", "PROFANITY"]
                let word = args[2].toLowerCase().replace(/[^A-Za-z0-9-]+/g,"")
                let wordType = args[3].toUpperCase()
                let severity = parseInt(args[4])

                if(args.length < 5) return message.channel.send("Error: Invalid amount of arugments (add word {word} {filtertype} {severity rating 1-3}")
                if(!wordTypeArray.includes(wordType)) return message.channel.send("Error: Invalid word filter type")
                if(severity > 3 || severity < 1 || isNaN(severity)) return message.channel.send("Error: Invalid Word Severity filter (Must be between either 1, 2 or 3")

                let query = `SELECT EXISTS (SELECT word FROM ${client.dbConf.blacklistedWordsTbl} WHERE word = ? LIMIT 1)`
                client.db.get(query, [word], (err, row) =>{
                    if(err) throw err;
                    if(row[Object.keys(row)[0]] === 0 ? false : true) return message.channel.send("Error: Word already in blacklist database")
                    let addQuery = `INSERT INTO ${client.dbConf.blacklistedWordsTbl} VALUES (?, ?, ?)`
                    client.db.run(addQuery,[word,wordType,severity], (err) =>{
                        if(err) console.log(`[ DB ]` + err)
                        console.log(`[ BOT ] DB ADD: WORD ${word} ${wordType} ${severity}`)
                    })
                })
                break;
            case "bypass":
                let bypassTypeArray = ["USER", "CHANNEL", "ROLE"]
                let id = parseInt(args[2])
                let bypassType = args[3].toUpperCase()
                console.log(id)
                if(!bypassTypeArray.includes(bypassType)) return message.channel.send("Error: Invalid Bypass Type")
                if(id.length > 5) return message.channel.send("Error: Invalid ID")
                if(isNaN(id)) return message.channel.send("Error: Invalid ID")

                let bypassExistsQuery = `SELECT EXISTS (SELECT id FROM ${client.dbConf.bypassTbl} WHERE id = ? LIMIT 1)`
                client.db.get(bypassExistsQuery, [id], (err,row) =>{
                    if(err) throw err
                    if(row[Object.keys(row)[0]] === 0 ? false : true) return message.channel.send(`Error: Bypass already exists`)
                    let addBypassQuery = `INSERT INTO ${client.dbConf.bypassTbl} VALUES (?,?)`
                    client.db.run(addBypassQuery, [id, bypassType], (err) => {
                        if(err) throw err;
                        console.log(`[ BOT ] DB ADD: BYPASS ${bypassType} ${id}`)
                    })
                })
                break;
       }
    }
};