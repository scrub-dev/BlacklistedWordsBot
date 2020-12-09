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
                if(newActivityVal !== 0 || newActivityVal !== 1) return userError(message, "Invalid value, please only use 0 for  off, 1 for on")
                if(currentActivityVal.value === newActivityVal) return userError(message, "Already set to that value!")
                let updateActivityQuery = `UPDATE botConfig SET value = :value WHERE name = :name`
                let activityStmt = client.db.prepare(updateActivityQuery)
                activityStmt.run({
                    name: "activity",
                    value: newActivityVal
                })
                successMessage(message, `Activity value changed! Was ${(currentActivityVal.value)? "Enabled" : "Disabled"} Now ${(newActivityVal)? "Enabled" : "Disabled"}`)
                break;
            case "responses":
                let currentResponseVal = getCurrentTableEntry(client, "botConfig", "name", "responses")
                let newResponseVal = parseInt(args[2])
                if(newResponseVal != 0 || newResponseVal != 1) return userError(message, "Invalid value, please only use 0 for  off, 1 for on")
                if(currentResponseVal.value === newResponseVal) return userError(message, "Already set to that value!")
                let updateResponsesQuery = `UPDATE botConfig SET value = :value WHERE name = :name`
                let responseStmt = client.db.prepare(updateResponsesQuery)
                responseStmt.run({
                    name: "responses",
                    value: newResponseVal
                })
                successMessage(message, `Responses value changed! Was ${(currentResponseVal)? "Enabled" : "Disabled"} Now ${(newResponseVal)? "Enabled" : "Disabled"}`)
                break;
            case "obfuscationcheck":
                let currentObfuscationVal = getCurrentTableEntry(client, "botConfig", "name", "obfuscationCheck")
                let newObfuscationVal = parseInt(args[2])
                if(newObfuscationVal !== 0 || newObfuscationVal !== 1) return userError(message, "Invalid value, please only use 0 for  off, 1 for on")
                if(currentObfuscationVal.value === newObfuscationVal) return userError(message, "Already set to that value!")
                let updateObfuscationCheckQuery = `UPDATE botConfig SET value = :value WHERE name = :name`
                let obfuscationStmt = client.db.prepare(updateObfuscationCheckQuery)
                obfuscationStmt.run({
                    name:"obfuscationCheck",
                    value: newObfuscationVal
                })
                successMessage(message, `ObfuscationCheck value changed! Was ${(currentObfuscationVal.value)? "Enabled" : "Disabled"} Now ${(newObfuscationVal)? "Enabled" : "Disabled"}`)
                break;
            case "duplicatecharcheck":
                let currentDupeVal = getCurrentTableEntry(client, "botConfig", "name", "duplicateCharCheck")
                let newDupeVal = parseInt(args[2])
                if(newDupeVal !== 0 || newDupeVal !== 1) return userError(message, "Invalid value, please only use 0 for  off, 1 for on")
                if(currentDupeVal.value === newDupeVal) return userError(message, "Already set to that value!")
                let updateDupeCheckQuery = `UPDATE botConfig SET value = :value WHERE name = :name`
                let dupeStmt = client.db.prepare(updateDupeCheckQuery)
                dupeStmt.run({
                    name:"duplicateCharCheck",
                    value: newDupeVal
                })
                successMessage(message, `duplicateCharCheck value changed! Was ${(currentDupeVal.value)? "Enabled" : "Disabled"} Now ${(newDupeVal)? "Enabled" : "Disabled"}`)
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
                successMessage(message, `Filter value changed! Was ${(currentFilterVal.value)? "Enabled" : "Disabled"} Now ${(newfilterVal)? "Enabled" : "Disabled"}`)
                break;
            case "smartdetect":
                let currentSDVal = getCurrentTableEntry(client, "botConfig", "name", "smartDetect")
                let newSDVal = parseInt(args[2])
                if(Math.abs(newSDVal) > 1) return userError(message, "Invalid value, please only use 0 for  off, 1 for on")
                if(currentSDVal.value === newSDVal) return userError(message, "Already set to that value!")
                let updateSDQuery = `UPDATE botConfig SET value = :value WHERE name = :name`
                let SDStmt = client.db.prepare(updateSDQuery)
                SDStmt.run({
                    name:"smartDetect",
                    value: newSDVal
                })
                successMessage(message, `SmartDetect value changed! Was ${(currentSDVal.value)? "Enabled" : "Disabled"} Now ${(newSDVal)? "Enabled" : "Disabled"}`)
                break;
            case "smartdetectthreshold":
                let currentSDTVal = getCurrentTableEntry(client, "botConfig", "name", "smartDetectThreshold")
                let newSDTVal = parseInt(args[2])
                if(newSDTVal > 10 || newSDTVal < 0) return userError(message, "Invalid value, must be between 0 and 10")
                if(currentSDTVal.value === newSDTVal) return userError(message, "Already set to that value!")
                let updateSDTQuery = `UPDATE botConfig SET value = :value WHERE name = :name`
                let SDTStmt = client.db.prepare(updateSDTQuery)
                SDTStmt.run({
                    name:"smartDetectThreshold",
                    value: newSDTVal
                })
                successMessage(message, `SmartDetectThreshold value changed! Was ${(currentSDTVal.value)? "Enabled" : "Disabled"} Now ${(newSDTVal)? "Enabled" : "Disabled"}`)
                break;
            default:
                return userError(message, "Unknown argument, did you spell it correctly?")
        }
	}
};