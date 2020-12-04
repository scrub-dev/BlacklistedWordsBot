const fs = require('fs')
module.exports.dbExists = (name) => {
    if(!fs.existsSync(`./dbs/${name}.db`)){
        return false
    }else{
        return true
    }
}
module.exports.createDB = (name) => {
    console.log(`[ INI ] Creating Database File`)
    fs.writeFileSync(`./dbs/${name}.db`, "")
}

module.exports.dbConnection = (name) => {
    const Database = require('better-sqlite3')
    console.log(`[ INI ] Connected to Database: ./dbs/${name}.db`)
    var db = new Database(`./dbs/${name}.db`)
    db.pragma('journal_mode = WAL');
    return db
}

module.exports.createTables = (db, dbConf) => {
    console.log(dbConf)
    console.log(`[ INI ] Creating database tables...`)
    db.exec(`CREATE TABLE IF NOT EXISTS ${dbConf.blacklistedWordsTbl} (word TEXT, blacklistType TEXT, severityLevel INT)`)
    console.log(`[ DB ] Creating Blacklisted Words Table`)
    db.exec(`CREATE TABLE IF NOT EXISTS ${dbConf.bypassTbl} (id TEXT, bypassType TEXT)`)
    console.log(`[ DB ] Creating Bypass Table`)
    db.exec(`CREATE TABLE IF NOT EXISTS ${dbConf.permissionTbl} (id TEXT, permissionLevel INT)`)
    console.log(`[ DB ] Creating Access Permissions Table`)

    let options = {
        "responses":0,
        "activity":1,
        "ObfuscationCheck":0,
    }
    db.exec(`CREATE TABLE IF NOT EXISTS botConfig (name TEXT, value INT)`)
    console.log(`[ DB ] Creating Bot Options Table`)
    let optionStmt = db.prepare(`INSERT INTO botConfig VALUES (:name, :value)`)
    const createOptions = db.transaction(() => {
        for(let option in options){
            optionStmt.run({
                name: option,
                value: options[option]
            })
        }
    })
    console.log(`[ DB ] Populating Bot Options table with default values`)
    createOptions()
}