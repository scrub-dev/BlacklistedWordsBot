
# Change Log:
## Version 1.9
* Added SmartDetect using Machine Learning
    * Using Tensorflow the bot can now detect the intention of a message, meaning you can delete a message if it is toxic / insulting etc.
    * You can enable, disable SmartDetect
    * You can set the sensitivity threshold for SmartDetect
* There is a high chance now with this tensorflow implementation that the dockerfile will no longer work, this will be rectified in an upcoming release.
## Version 1.8
* Added Regex checker for flagged words
    * ooooooofffffffff and oof get picked up as the same word so you only have to have one entry in the blacklisted words database.
* Added "leet" Character detection
    * 00f and oof are picked up as the same so you only need one entry in the blacklisted words database (# = h, $ = s etc.).
* Added Stats command
    * Allows you to view bot stats, system stats and server stats
* Activity and Responses now enabled/disabled while running though botOptions Command.
* Create module files to neated up database creation and connection process.
* Created more module functions to increase readability in core files.
## Version 1.7.1
* Added [Documentation](./docs)
## Version 1.7.0
* Added update functionality to the bot
    * Includes appropriate permission levels
* Bug fixing for CRUD functions of permissions with permission handling
## Version 1.6.0
* Deletion now implemented
    * Blacklisted Words based on Word
    * Bypasses based on ID
    * Permissions based on ID
    * Full permissions implementation based on hierarchy, for example someone with level 1 cannot remove someone with level 3 access to the bot
## Version 1.5.0
* Moved from sqlite3 library to better-sqlite
* Refactored codebase to allow for better-sqlite to work
* Moderator permissions fully intergrated now
## Version 1.4.0
* Added Read functionality
    * Command `{prefix} list [words | bypasses | permissions]`
* Updated Readme with fancy image
## Version 1.3.0
* Bot Moderation Support added!
    * Give other users access to the bots commands
    * Allows for different levels of access
        * Each level inherits the permissions of the level below it
        * Any user with administrator permissions autimatically has permission level 3
        * Level 1: CRUD for Blacklisted Words
        * Level 2: CRUD for Bypasses
        * Level 3: CRUD for Bot Moderation permissions
    * Fixed bug where number inaccuracies would cause bugs with parsing IDs as ints into the database
## Version 1.2.3
* Added changelog
## Version 1.2.2
* Docker support!!!
* Fixed some simple spelling mistakes in the code :(
## Version 1.2.1
* Added Code Analysis workflow to github
* Updated code to never require a private config
    * Implemented Environment variables to handle this (dotenv)
## Version 1.2.0
* Removed redundant code
* Fixed a bug with loading the token if the private condig does not exist
## Version 1.1.6
* Fixed a few bugs, again...
* Removed redundant code
* Refactored Code to make it more efficient
## Version 1.1.5
* A lot more bug fixing...
## Version 1.1.4
* More bug fixing :(
## Version 1.1.4
* Added dynamic word functionality
    * Ability to add words to the blacklist database through discord
        * Command: `{prefix}add word [type] [severity(1 - 5)]`
        * Word Types: `DEFAULT DISCRIMINATION SEXUALCONTENT HOSTILILITY PROFANITY`
* Added Bypass functionality
    * Can now bypass on 3 types of checks
        * Command `{prefix}add bypass [id] [type]`
        * Bypass Types `USER CHANNEL ROLE`
## Version 1.1.3
* Bug fixing previous version ;)
## Version 1.1.2
* Added .gitignore
* Added better logging for users
* Added database configs optionss to `./util/config.json`
## Version 1.1.1
* Added basic database support with local database
    * Creates database automatically on startup
    * Creates tables automatically on startup
## Version 1.1.0
* Added Command Handler
* Added setActivity function
## Version 1.0.1
* Slight refactor to make code more readable
## Version 1.0.0
* Created bot
* Rapid Prototyped bot functionality