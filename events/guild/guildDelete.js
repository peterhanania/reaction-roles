const Event = require('../../structures/Event');
const Discord = require('discord.js');
const Guild = require('../../database/guild');
const ReactionRole = require("../../packages/reactionrole/models/schema");

module.exports = class extends Event {

  async run(guild) {

    console.log(`--| I just left ${guild.name} |--`)

    Guild.findOneAndDelete({
      guildId: guild.id,
    }).catch(()=>{});


    const conditional = {
      guildid: message.guild.id
   }
   const results = await ReactionRole.find(conditional)
   
   if (results && results.length) {
       for (const result of results) {

           try {
               await ReactionRole.deleteOne(conditional)
           } catch (e) {
               console.log(e)
           }
   
       }
   
   };

   


   
  }
};