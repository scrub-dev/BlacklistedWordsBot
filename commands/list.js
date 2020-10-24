const Discord = require('discord.js')
module.exports = {
	name: 'list',
    description: 'list current blacklisted words',
    args: true,
	execute(client,message,args) {
        client.db.all(`SELECT * FROM ${client.dbConf.blacklistedWordsTbl}`, (err, rows) =>{
            if(rows.length == 0) console.log(`[ DB ] No Blacklisted words found`)
            if(err) throw err;
            console.log(`[ DB ] Blacklist count: ${rows.length}`)
            rows.forEach((row) => {
                console.log(`[ DB ] ${row.word}` )
            })
        })
    }
};