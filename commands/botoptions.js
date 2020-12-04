const Discord = require('discord.js')
const config = require('../util/config.json')
const { checkPermission, noPermissionMessage, userError, getCurrentTableEntry, successMessage } = require('../util/utils.js')
module.exports = {
	name: 'botoptions',
    description: 'Change bot settings',
    args: false,
	execute(client,message,args) {
        if(!checkPermission(client, message, 3)) return noPermissionMessage(message)
        if(args[2].length > 1) return userError(message, "Invalid value provided")
        switch(args[1].toLowerCase()){
            case "activity":
                let currentActivityVal = getCurrentTableEntry(client, "botConfig", "name", "activity")
                let newActivityVal = parseInt(args[2])
                if(currentActivityVal.value === newActivityVal) return userError(message, "Already set to that value!")
                let updateActivityQuery = `UPDATE botConfig SET value = :value WHERE name = :name`
                let activityStmt = client.db.prepare(updateActivityQuery)
                activityStmt.run({
                    name: "activity",
                    value: newActivityVal
                })
                successMessage(message, `Activity value changed! Was ${(currentActivityVal)? "Enabled" : "Disabled"} Now ${(newActivityVal)? "Enabled" : "Disabled"}`)
                break;
            case "responses":
                let currentResponseVal = getCurrentTableEntry(client, "botConfig", "name", "responses")
                let newResponseVal = parseInt(args[2])
                if(currentResponseVal.value === newResponseVal) return userError(message, "Already set to that value!")
                let updateResponsesQuery = `UPDATE botConfig SET value = :value WHERE name = :name`
                let responseStmt = client.db.prepare(updateResponsesQuery)
                responseStmt.run({
                    name: "responses",
                    value: newResponsesVal
                })
                successMessage(message, `Responses value changed! Was ${(currentResponseVal)? "Enabled" : "Disabled"} Now ${(newResponseVal)? "Enabled" : "Disabled"}`)
                break;
            case "obfuscationcheck":
                let currentObfuscationVal = getCurrentTableEntry(client, "botConfig", "name", "obfuscationCheck")
                let newObfuscationVal = parseInt(args[2])
                if(currentVal.value === newVal) return userError(message, "Already set to that value!")
                let updateObfuscationCheckQuery = `UPDATE botConfig SET value = :value WHERE name = :name`
                let obfuscationStmt = client.db.prepare(updateObfuscationCheckQuery)
                obfuscationStmt.run({
                    name:"obfuscationCheck",
                    value: newObfuscationVal
                })
                successMessage(message, `ObfuscationCheck value changed! Was ${(currentObfuscationVal)? "Enabled" : "Disabled"} Now ${(newObfuscationVal)? "Enabled" : "Disabled"}`)
                break;
            case "filterlevel":
                let currentFilterVal = getCurrentTableEntry(client, "botConfig", "name", "blacklistFilterLevel")
                let newFilterVal = parseInt(args[2])
                if(newFilterVal > 3 || newFilterVal < 1) return userError(message, "Invalid filter level!")
                if(currentFilterVal.value === newFilterVal) return userError(message, "Already set to that value!")
                let updateFilterQuery = `UPDATE botConfig SET value = :value WHERE name = :name`
                let filterStmt = client.db.prepare(updateFilterQuery)
                filterStmt.run({
                    name: "blacklistFilterLevel",
                    value: newFilterVal
                })
                successMessage(message, `Filter value changed! Was ${(currentFilterVal)? "Enabled" : "Disabled"} Now ${(newfilterVal)? "Enabled" : "Disabled"}`)
                break;
            default:
                return userError(messasge, "Unknown argument, did you spell it correctly?")
        }
	}
};