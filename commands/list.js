const Discord = require('discord.js')
module.exports = {
	name: 'list',
    description: 'list current blacklisted words',
    args: true,
	execute(client,message,args) {
        let wordsFlag = args[1] === "words" ? true : false
        let listTable = args[1] === "words" ? client.dbConf.blacklistedWordsTbl : client.dbConf.bypassTbl
        client.db.all(`SELECT * FROM ${listTable}`, (err, rows) =>{
            if(rows.length == 0) console.log(`[ DB ] No Blacklisted words/bypasses found`)
            if(err) throw err;
            rows.forEach((row) => {
                if(wordsFlag) console.log(`[ DB ] ${row.word}` )
                else console.log(`[ DB ] ${row.id} | ${row.bypassType}` )
            })
        })
    }
};