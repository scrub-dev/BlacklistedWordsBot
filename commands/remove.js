const Discord = require('discord.js')
module.exports = {
	name: 'remove',
    description: 'remove a word or bypass',
    args: true,
	execute(client,message,args) {
        let listString = "Currently blacklisted words:\n";
        client.db.all(`SELECT * FROM ${client.dbConf.blacklistedWordsTbl}`, (err, rows) =>{
            if(err) throw err;
            rows.forEach((row) => {
                console.log(`[ DB ] ${row.word}` )
            })
        })
    }
};