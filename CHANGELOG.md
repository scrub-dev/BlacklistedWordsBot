
# Change Log:
## Version 1.6.0
* Deletion now implemented
    * Blacklisted Words based on Word
    * Bypasses based on ID
    * Permissions based on ID
    * Full permissions implementation based on heirarchy, for example someone with level 1 cannot remove someone with level 3 access to the bot
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
        * Level 3: Crud for Bot Moderation permissions
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