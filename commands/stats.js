const Discord = require('discord.js')
const config = require('../util/config.json')
module.exports = {
	name: 'stats',
    description: 'Display bot stats!',
    args: false,
	execute(client,message,args) {
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`Stats`);
        embed.addField(":robot: Bot Stats :robot:", 
        `**Memory Usage**: ${(((process.memoryUsage().heapUsed)/1024)/1024).toFixed(0)}Mb
        **Uptime**: ${new Date(Math.floor(process.uptime()) * 1000).toISOString().substr(11,8)}
        **Ping**: ${client.ws.ping}Ms
        **Bot Version**: ${config.bot.botVer}`,true)
        embed.addField(":desktop: System Stats :desktop:", 
        `**Platform**: ${process.platform}
        **Architecture**: ${process.arch}
        **Local Time**: ${new Date().toLocaleTimeString()}`,true)
        embed.addField(":radio_button: Server Stats :radio_button:",
        `**Name**: ${message.guild.name}
        **Owner**: ${message.guild.owner.user.username}
        **Total Members**: ${client.guilds.cache.get(message.guild.id).memberCount}`,true)
        message.channel.send(embed)
	}
};