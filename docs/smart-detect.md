# Smart Detect
---
Smart detect uses a Tensorflow JS model as well as tensorflow istelf to determine the intentions of a message.

SmartDetect is turned off by default

The Default SmartDetectThreshold is 8

To Enable / Disable smart detect:
```
{prefix}botoptions smartdetect {1 | 0}
```

The Smart detect functionality uses thresholds to identify toxic language in messages, you can change this threshold though a similar commamd,
this will determine the sensitivity for the smart detect function.
```
{prefix}botoptions smartdetectthreshold {1...9}
```

Smart Detect can take a few seconds to identify the intetions of the message but will then delete the message if found to flag and toxic intentions. The bot will then ouput an embed of all the toxic intetions the message flagged.

The Blacklist functionality will run before the Smart Detect and is much faster.
