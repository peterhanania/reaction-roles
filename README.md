<h1 align="center">
Discord Reaction Roles bot
  <br>
</h1>


<p align="center">
  <a href="#about">About</a>
  •
  <a href="#features">Features</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#setting-up">Setting Up</a>
</p>

## About

An open source reaction roles bot to anyone who needs one in their server. It's easy to use, similar to the reaction roles bot and Totally Free. The bot also used MongoDB as a database!

If you liked this repository, feel free to leave a star ⭐!

## Features

`addreaction :` Creates a reaction role. <br>
`editreaction:` Edit the role which a certain reaction given.<br>
`builder     :` Starts a prompt and create your reaction role.<br>
`removerr    :` Removes a reaction role.<br>
`dm          :` Enables / Disables Reaction Role DMs.<br>
`types       :` Display's All available reaction role types.<br>
`wipe        :` Wipe all reaction Roles from the current guild.<br>

*Also, Unlimited reactions per message, and customizable prefix per guild.*

## Installation

```
git clone https://github.com/peterhanania/reaction-roles.git
```
then run:
```
npm install
```


## Setting Up

Set up all your information in the *config.json* File as such
```
{
  "prefix": "BOT_PREFIX_YOU_WANT",
  "main_token": "YOUR_BOT_TOKEN",
  "mongodb_url": "MONGODB_URL",
  "developers": ["DEVELOPERS_IDS"],
  "bot_name":"YOUR_BOT_NAME"
}
```
 > You can change the emojis in `emojis.js` and colors in `colors.js`
 
 ### Important
 Please make sure to have enabled `Privileged Intents` on your Discord [developer portal](https://discordapp.com/developers/applications/). 




Once done, you can launch the bot with `node index.js`. 

Any questions? DM me on <a href="https://discord.com/users/710465231779790849">Discord</a>.
