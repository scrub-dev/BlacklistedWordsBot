# Moderation Permissions
---
The bot has its own permissions to manage its commands.
Anyone with a role that has the `Administrator` checkbox set will automatically have an access level of 4. You cannot assign someone a permission level of 4.

Every higher level inherits the previous levels permissions
For example, someone with level 2 access to the bot can also do level 1 permissions as well.

- Level 1: Create, Read, Update, Delete Blacklisted Words
- Level 2: Create, Read, Update, Delete Bypasses
- Level 3: Create, Read, Update, Delete Permissions
    - Users with Level 3 Access can only perform these commands on users with a lower access level then them.
    - They cannot give level 3 access but can give level 1 and level 2 access
- Level 4: Create, Read, Update, Delete Permissions
    - Can give level 3 access to users
    - Automatically assigned to anyone with Administrator permission in the discord server
    - Cannot be removed unless the roles is taken off the user
    - Cannot be given to users unless given a role in the server with Administrator permissions