![BlacklistedWordsBot-Logo](/assets/name.png)
---
[![social](https://img.shields.io/badge/Social-Twitter-blue)](https://twitter.com/scrub_fps) ![version](https://img.shields.io/badge/Version-1.7-green) ![discordVer](https://img.shields.io/badge/Discord.js-%5E12.3.1-blue)

BWB is a Discord.js Discord bot for handling auto moderation of words in a blacklist, deleting them as well as handling bypass conditions.
This bot allows for randomized responses to replace the blacklisted word/phrase as well as multiple bypass filters so it can ignore users based on user, roles and/or channels.
With its own permission levels, you can assign different users different permissions levels to interact with the bot.

This bot features clever detection functions that allow for it to check for obfuscation of a word. this includes multiple characters and obfuscation through using "leet" character replacments.
For example: DB Entry(oof) would detect `oof, 00f, oooooooooo00000fffffffffphphphphph`
The downside of this is that `of` would also be detected, this is why there is an option to disable either or both of the checks. Read the config documentation for the bot to see which flags you want enabled.

This is more of a personal project because I got bored,  it might have bugs in it, feel free to drop an Issue and ill get around to fixing it in the next release. I do plan to support this for a while as I need to get back in the habit of programming. Thank you for taking interest in this bot.

## Quick Start:
First off, drop your bot's token in `config.json bot.token` or make a `.env` file in the root directory with `TOKEN=YOURTOKENHERE`.
Contained in this version is a Json file (`blacklist.json`) with an array, fill this array with all the blocked words you want to delete when users type them. Obviously this does not update when a new word is added so I would suggest using nodemon to restart when a file changes or pm2 --watch for the same effect. Node is good for getting up and going straight away.
`node index.js`
`nodemon index.js`
`pm2 start index.js`

## Docker:
If you want to run the bot in a Docker Container, you now can! Included is the dockerfile to create an image of this bot. Before building the image, please open the file and set your bots token here 
`ENV TOKEN=YOURTOKENHERE` 
Or can also set the token as a variable when you environment variable when you run the image. 

To build the bot image simply type in the root directory of the repo
`docker build --tag blacklisted_word_bot .`
then you can either run it through command line or create a container or
Docker Desktop.

## Documentation
- [Configuration](./docs/config.md)
- [Troubleshooting](./docs/troubleshooting.md)
- [Commands](./docs/commands.md)
- [Blacklisted Words](./docs/blacklisted-words.md)
- [Bypasses](./docs/bypasses.md)
- [Bot Access Levels](./docs/moderation-permissions.md)

## To Do:
* Create a server settings json file to store persistant data for server (Could just   include in config.json)
* Server moderation level for all blacklistTypes
    * If the server wants responses when the message is removed by the bot
    * If the server wants to audit log every message deletion
* Implement a better way to store data for the setActivity Function
* Implement word severity check agaist server settings table
* Possibly add more functionality towards making it a full feature generic discord bot
* Look into adding detection of obfuscation for blacklisted words ie: # = h, 3 = e etc
* Complete documentation for bot

## License
[MIT](https://choosealicense.com/licenses/mit/)