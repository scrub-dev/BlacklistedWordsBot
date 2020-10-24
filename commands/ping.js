const Discord = require('discord.js')
module.exports = {
	name: 'ping',
    description: 'Ping!',
    args: false,
	execute(client,message,args) {
        const pingEmbed = new Discord.MessageEmbed()
            .setTitle("Ping:")
            .setDescription("...Pinging")
		message.channel.send(pingEmbed).then(m =>{
            let ping = m.createdTimestamp - message.createdTimestamp
            const pingEmbed2 = new Discord.MessageEmbed()
            .setTitle("🏓 Ping")
            .setDescription(ping + "Ms")
            m.edit(pingEmbed2)
        })
	},
};