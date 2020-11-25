const Discord = require('discord.js')
module.exports = {
	name: 'update',
    description: 'update a database value',
    args: true,
	execute(client,message,args) {
        switch(args[1].toLowerCase()){
            case "word":
                break;
            case "bypass":
                break;
            case "permission":
                break;
            default:
                userError(message, "Argument not recognised, did you spell it correctly? (word | bypass | permission)")
                break;
        } 
    }
};