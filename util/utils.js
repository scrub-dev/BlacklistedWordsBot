module.exports.checkPermission = (client, message, level) => {
    if(message.member.hasPermission("ADMINISTRATOR")) return true;
    let id = message.member.id
    let permissionQuery = `SELECT id, permissionLevel FROM ${client.dbConf.permissionTbl} WHERE id  = ? LIMIT 1`
    client.db.get(permissionQuery, [id], (err, row) => {
        if(err) throw err;
        if(!row.id) return false;
        if(row.permissionLevel < level) return false;
    })
}