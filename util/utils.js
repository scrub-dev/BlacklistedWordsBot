const Discord = require("discord.js");

module.exports.getUserPermissionLevel = (client, member) => {
    if(member.hasPermission("ADMINISTRATOR")) return 4
    let permissionQuery = `SELECT id, permissionLevel FROM ${client.dbConf.permissionTbl} WHERE id = :id LIMIT 1`
    let stmt = client.db.prepare(permissionQuery)
    let res = stmt.get({id: member.id})
    if(res === undefined) return 0
    else return res.permissionLevel
}

module.exports.checkPermission = (client, message, level) => {
    let flag = (this.getUserPermissionLevel(client,message.member) >= level)? true : false
    return flag
}

module.exports.getCurrentTableEntry = (client,table,columnName,value) => {
    let query = `SELECT * FROM ${table} WHERE ${columnName} = :x`
    let stmt = client.db.prepare(query)
    let res = stmt.get({x: value})
    return res
}

module.exports. randomArrayReturn = (resArr) => {
    return resArr[Math.floor(Math.random()*resArr.length)]
}

module.exports.noPermissionMessage = (message) => {
    let embed = new Discord.MessageEmbed();
    embed.setTitle('❌ ERROR ❌').setDescription("***You don't have permission to use this command***").setColor("RED");
    message.channel.send(embed)
};
module.exports.successMessage = (message, info) => {
    let embed = new Discord.MessageEmbed();
    embed.setTitle('✅ Success! ✅').setDescription(`***Success!*** ${info}`).setColor("GREEN");
    message.channel.send(embed)
}
module.exports.userError = (message, info) => {
    let embed = new Discord.MessageEmbed();
    embed.setTitle('❌ ERROR ❌').setDescription(`***Error*** ${info}`).setColor("RED");
    message.channel.send(embed)
}
module.exports.embedOutput = (message, title, description) => {
    if(description.length > 2048){
        let descriptionOverflow = description.slice(2047)
        description = description.substring(0, 2048)
        this.embedOutput(message, title, descriptionOverflow)
    }
    let embed = new Discord.MessageEmbed();
    embed.setTitle(title).setDescription(description).setColor("ORANGE");
    message.channel.send(embed)    
}

module.exports.returnTable = async (client, table) => {
    return new Promise (resolve => {
        let qry = `SELECT * FROM ${table}`
        let stmt = client.db.prepare(qry)
        let res = stmt.all()
        resolve (res)
    })
}

module.exports.getTableRowCount = (db, table) => {
    let stmt = db.prepare(`SELECT * FROM ${table}`)
    let res = stmt.all()
    return res.length
}
module.exports.regexStringBuilder = (word,client) => {
    let duplicateRes = this.getCurrentTableEntry(client, "botConfig", "name", "duplicateCharCheck")
    if(duplicateRes.value){
        let wordArr = word.split("")
        let x = ""
        wordArr.forEach(e => {
            e = escapeRegExp(e)
            x += `[${e}]+`
        })
        return x
    }else{
        return escapeRegExp(word)
    }
}

module.exports.removeDuplicateCharacters = (word) => {
    word = escapeRegExp(word)
    return word.toLowerCase().replace(/(.)\1+/g, '$1')
}

module.exports.deobfuscateWord = (word) => {
    word = escapeRegExp(word)
    let leetArr = {
        "1":"i",
        "2":"z",
        "3":"e",
        "4":"a",
        "5":"s",
        "6":"b",
        "7":"t",
        "8":"b",
        "9":"g",
        "0":"o",
        "\@":"a",
        "\/\\\\":"a",
        "Д":"a",
        "а":"a",
        "в":"b",
        "ь":"b",
        "ß":"b",
        "©":"c",
        "¢":"c",
        "с":"c",
        "\\\|\\\)":"d",
        "е":"e",
        "€":"e",
        "£":"e",
        "ph":"f",
        "ƒ":"f",
        "н":"h",
        "#":"h",
        "!":"i",
        "\|":"i",
        "\|\<":"k",
        "м":"m",
        "/\\\/\\\\":"m",
        "\(V\)":"m",
        "п":"n",
        "и":"n",
        "И":"n",
        "\/V":"n",
        "ө":"o",
        "о":"o",
        "Ø":"o",
        "р":"p",
        "kw":"q",
        "®":"r",
        "Я":"r",
        "§":"ss",
        "$":"s",
        "т":"t",
        "\\\/":"v",
        "\\\/\\\/":"w",
        "Ш":"w",
        "%":"x",
        "Ж":"x",
        "у":"y",
        "ү":"y",
        "Ч":"y",
        "¥":"y"
    }
    for(let char in leetArr){
        if(word.includes(char)){
            word = word.replace(new RegExp(escapeRegExp(char), "g"), leetArr[char])
        }
    }
    return word
}
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}