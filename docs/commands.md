# Commands
---

## Add
Adds either a blacklisted word, bypass or access level.
#### Add Word:
Required Access Level : 1
Command Structure: `{prefix}add word {word} {blackListType} {severityLevel}`
`{prefix}` = Your bots prefix set in the [Config file](../util/config.json)
`{word}` = The word you want to add to the blacklist
`{blackListType}` = The type of word, can pick from `{"DEFAULT" | "DISCRIMINATION" | "SEXUALCONTENT" | "HOSTILILITY" | "PROFANITY"}`
`{severityLevel}` = At what filter level do you want to start filtering the word at? Must be either 1,2 or 3
#### Add Bypass:
Required Access Level: 2

#### Add Permission
Require Access Level: 3/4

## List

#### List Word/Words
#### List Bypass/Bypasses
#### List Permission/Permissions

## Update
#### Update Word
#### Update Bypass
#### Update Permission
## Remove
#### Remove Word
#### Remove Bypass
#### Remove Permission