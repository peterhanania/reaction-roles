const Event = require('../../structures/Event');
const Discord = require('discord.js');
const Guild = require('../../database/guild');

module.exports = class extends Event {

  async run(guild) {
  
    console.log(`--| I just joined ${guild.name} |--`)

    const newGuild = await Guild.create({
      guildId: guild.id,
    })
    


    
  }
};