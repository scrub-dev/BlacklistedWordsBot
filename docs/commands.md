# Commands
---

## Add
Adds either a blacklisted word, bypass or access level.
#### Add Word
Required Access Level: 1.
Command Structure: `{prefix}add word {word} {blackListType} {severityLevel}`
`{prefix}` = Your bots prefix set in the [Config file](../util/config.json).
`{word}` = The word you want to add to the blacklist.
`{blackListType}` = The type of word, can pick from `{"DEFAULT" | "DISCRIMINATION" | "SEXUALCONTENT" | "HOSTILILITY" | "PROFANITY"}`.
`{severityLevel}` = At what filter level do you want to start filtering the word at? Must be either 1,2 or 3.
#### Add Bypass
Required Access Level: 2.
Command Structure: `{prefix}add bypass {bypassID} {bypassType}`.
`{prefix}` = Your bots prefix set in the [Config file](../util/config.json).
`{bypassID}` = The ID you want to be allowed to bypass.
`{bypassType}` = The Type of ID that you want to be allowed to bypass `{"USER" | "CHANNEL" | "ROLE"}`.
#### Add Permission
Require Access Level: 3/4.
Command Structure: `{prefix}add permission {permissionID} {permissionLevel}`.
`{prefix}` = Your bots prefix set in the [Config file](../util/config.json).
`{permissionID}` = The ID of the user you want to give access level permission to.
`{permissionLevel}` = The Level of access you want the user to be given, must be a 1,2 or 3.
## List
The list command returns a discord rich embed message with a list of all the entries in the specified table (word/bypass/permission), you can only list tables you have CRUD access to.
#### List Word/Words
Required Access Level: 1.
Command Structure: `{prefix}list {word | words}`.
`{prefix}` = Your bots prefix set in the [Config file](../util/config.json).
`{word | words}` = Either of them will both return a list of blacklisted words.
#### List Bypass/Bypasses
Required Access Level: 2.
Command Structure: `{prefix}list {bypass | bypasses}`.
`{prefix}` = Your bots prefix set in the [Config file](../util/config.json).
`{bypass | bypasses}` = Either of them will return a list of bypasses.
#### List Permission/Permissions
Required Access Level: 3.
Command Structure: `{prefix}list {permission | permissions}`.
`{prefix}` = Your bots prefix set in the [Config file](../util/config.json).
`{permission | permissions}` = Either of them will return a list of people with access permissions.

## Update
Update a value in a database based off the identifier.
Note: you cant change the ID using this method or the Word in a blacklist as those are the unique parts of the database. If you wanted to change these you will have to delete the old one and add the new one, You can update a blacklisted words type or severity, a Bypasses type or a users permission level.
#### Update Word
Required Access Level: 1.
Command Structure: `{prefix}update word {word} {New/Old blackListType} {New/Old severityLevel}`.
`{prefix}` = Your bots prefix set in the [Config file](../util/config.json).
`{New/Old blackListType}` = Either the type to be updated or the old type.
`{New/Old severityLevel}` = Either the level to be updated or the old level.

#### Update Bypass
Required Access Level: 2
Command Structure: `{prefix}update bypass {bypassID} {New BypassType}`
`{prefix}` = Your bots prefix set in the [Config file](../util/config.json).
`{bypassID}` = The ID of the bypass you want to change a value of.
`{New BypassType}` = The New Bypass Type you want the ID to associated to.

#### Update Permission
Require Access Level: 3/4
Command Structure: `{prefix}update permission {permissionID} {New Level}`
`{prefix}` = Your bots prefix set in the [Config file](../util/config.json).
`{permissionID}` = The ID of the user you want to update the permission level of.
`{New Level}` = The new access level you want to give them.

## Remove

#### Remove Word
Required Access Level: 1
Command Structure: `{prefix}remove word {word}`
`{prefix}` = Your bots prefix set in the [Config file](../util/config.json).
`{word}`  = word you want to remove from the database.
#### Remove Bypass
Required Access Level: 2
Command Structure: `{prefix}remove bypass {bypassID}`
`{prefix}` = Your bots prefix set in the [Config file](../util/config.json).
`{bypassID}`  = Bypass you want to remove from the database.
#### Remove Permission
Require Access Level: 3/4
Command Structure: `{prefix}remove permission {permissionID}`
`{prefix}` = Your bots prefix set in the [Config file](../util/config.json).
`{permissionID}`  = user's ID you want to revoke access to the bots commands.