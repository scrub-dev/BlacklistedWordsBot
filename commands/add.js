const Discord = require('discord.js')
const { parseArgsStringToArgv } = require('string-argv')
module.exports = {
	name: 'add',
    description: 'add',
    args: true,
	execute(client,message,args) {
        switch(args[1]){
            case "word":
                let word = args[2]
                let type = args[3]
                let severity = args[4]
                break;
            case "bypass":
                let id = args[2]
                let type = args[3]
                break;
       }
    }
};