const Event = require('../../structures/Event');
const { Permissions, Collection } = require("discord.js");
const moment = require('moment');
const discord = require("discord.js");
const config = require('./../../config.json');
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../database/guild')

module.exports = class extends Event {
  constructor(...args) {
    super(...args);

    this.impliedPermissions = new Permissions([
      "VIEW_CHANNEL",
      "SEND_MESSAGES",
      "SEND_TTS_MESSAGES",
      "EMBED_LINKS",
      "ATTACH_FILES",
      "READ_MESSAGE_HISTORY",
      "MENTION_EVERYONE",
      "USE_EXTERNAL_EMOJIS",
      "ADD_REACTIONS"
    ]);

    this.ratelimits = new Collection();
  }

  async run(message) {
    try {
    
      const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
      const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}>`);
    
      if (!message.guild || message.author.bot) return;

      const settings = await Guild.findOne({
        guildId: message.guild.id,
      }, async (err, guild) => {
        if (err) console.log(err)
        
        if (!guild) {
          const newGuild = await Guild.create({
            guildId: message.guild.id,
            prefix: config.prefix || 'rr!',
          });

          return message.channel.send(`Successfuly added ${message.guild.name} to the database. Bot works now.`)
        }
      });

    
    
      if (message.content.match(mentionRegex)) {

       message.channel.send(`Hello there! My prefix for this server is ${settings.prefix || 'rr!' }`).then((s)=>{
         s.delete({ timeout: 10000 })
       }).catch(()=>{})

      }




      let mainPrefix = settings ? settings.prefix : 'rr!';

      const prefix = message.content.match(mentionRegexPrefix) ? 
        message.content.match(mentionRegexPrefix)[0] : mainPrefix 



        
      if (!message.content.startsWith(prefix)) return;
      
    
      const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
      const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));





   
      if (command) {
       
        const rateLimit = this.ratelimit(message, cmd);

        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

        //check for cooldown
        if (typeof rateLimit === "string") return message.channel.send(`Please wait **${rateLimit}** before running the **${cmd}** command again - ${message.author}`);
  

        if (command.botPermission) {

          const missingPermissions =
      message.channel.permissionsFor(message.guild.me).missing(command.botPermission).map(p => permissions[p]);

          if (missingPermissions.length !== 0) {
       const embed = new MessageEmbed()
        .setAuthor(`${this.client.user.tag}`, message.client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(` Missing Bot Permissions`)
        .setDescription(`Command Name: **${command.name}**\nRequired Permission: **${missingPermissions.map(p => `${p}`).join(' - ')}**`)
        .setTimestamp()
        .setFooter('https://github.com/peterhanania/reaction-rolesom/peterhanania/reaction-roles')
        .setColor(message.guild.me.displayHexColor);
      return message.channel.send(embed).catch(()=>{})
          }
        }

   
      

  
        if (command.userPermission) {
             const missingPermissions =
        message.channel.permissionsFor(message.author).missing(command.userPermission).map(p => permissions[p]);
      if (missingPermissions.length !== 0) {
        const embed = new MessageEmbed()
          .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
          .setTitle(`Missing User Permissions`)
          .setDescription(`Command Name: **${command.name}**\nRequired Permission: **${missingPermissions.map(p => `${p}`).join('\n')}**`)
          .setTimestamp()
          .setFooter('https://github.com/peterhanania/reaction-rolesom/peterhanania/reaction-roles')
          .setColor(message.guild.me.displayHexColor);
       return message.channel.send(embed).catch(()=>{})
      }

        }
       


        if (command.ownerOnly) {
          if (!this.client.config.developers.includes(message.author.id)) return
        }

        if (command.disabled) return message.channel.send(`The owner has disabled the following command for now. Try again Later!`)
        
        await this.runCommand(message, cmd, args)

        .catch(error => {
        console.log(error);
        return message.channel.send(`An Error has occured, Please let the developer know.`)
        })
      }
    } catch(error) {
      console.log(error);
      return message.channel.send(`An Error has occured, Please let the developer know.`)
    }
  } 

    async runCommand(message, cmd, args) {

        if (!message.channel.permissionsFor(message.guild.me) || !message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS'))
          return message.channel.send(`Missing bot Permissions - **Embeds Links**`)

        const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
      
        await command.run(message, args)
    }

    ratelimit(message, cmd) {
      try {
        const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
        if (message.author.permLevel > 4) return false;
    
        const cooldown = command.cooldown * 1000
        const ratelimits = this.ratelimits.get(message.author.id) || {}; 
        if (!ratelimits[command.name]) ratelimits[command.name] = Date.now() - cooldown; 
        const difference = Date.now() - ratelimits[command.name];
        if (difference < cooldown) { 
          return moment.duration(cooldown - difference).format("D [days], H [hours], m [minutes], s [seconds]", 1); 
        } else {
          ratelimits[command.name] = Date.now(); 
          this.ratelimits.set(message.author.id, ratelimits); 
          return true;
        }
      } catch(error) {
        console.log(error);
        return message.channel.send(`An Error has occured, Please let the developer know.`)
      }
    }
}