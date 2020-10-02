# Discord Blacklisted Words Bot
---
[![social](https://img.shields.io/badge/Social-Twitter-blue)](https://twitter.com/scrub_fps) ![version](https://img.shields.io/badge/Version-1.0-green) ![loc](https://img.shields.io/tokei/lines/github/Scott-Donaldson/BlacklistedWordsBot?label=Lines%20of%20code) ![discordVer](https://img.shields.io/badge/Discord.js-%5E12.3.1-blue)

BWB is a Discord.js bot for handling auto moderation of words in a blacklist, deleting them and logging them to the audit log.

This bot allows for randomized responses to replace the blacklisted word/phrase as well as multiple bypass filters so it can ignore users based on user, roles and/or channels.

This is more of a personal project because I got bored,  it might have bugs in it, feel free to drop an Issue and ill get around to fixing it in the next release. I do plan to support this for a while as I need to get back in the habit of programming. Thank you for taking interest in this bot.

## Quick Start:
First off, drop your bot's token in `config.json bot.token`.
Contained in this version is a Json file (`blacklist.json`) with an array, fill this array with all the blocked words you want to delete when users type them. Obviously this does not update when a new word is added so I would suggest using nodemon to restart when a file changes or pm2 --watch for the same effect. Node is good for getting up and going straight away.
`node index.js`
`nodemon index.js`
`pm2 start index.js --watch`

## Allowing bypasses
You might not want  everyone to be affected by this bot. In the `config.json` there are 3 methods for bypassing its blacklist check. All work off ID's.
* User bypass: checks the user id against the userBypass array.
* Role bypass: checks the users roles against the roleBypass array.
* Channel bypass: turns off the checks for any channel in the channelBypass array.

These all work on ID's of each type and not the names!