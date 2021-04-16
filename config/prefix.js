const Command = require('../../structures/Command');
const Guild = require('../../database/guild');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'prefix',
        description: 'Sets the prefix for this server',
        category: 'Config',
        usage: [ '<prefix>' ],
        examples: [ 'prefix $', 'prefix +', 'prefix ?' ],
        cooldown: 3,
        guildOnly: true,
        userPermission: ['MANAGE_GUILD']
      });
    }

    async run(message, args) {
      const settings = await Guild.findOne({
        guildId: message.guild.id,
      }, (err, guild) => {
        if (err) console.log(err)
      });

      if (args.length < 1) {
        return message.channel.send(`Please provide me with a prefix!`)
      }

      await settings.updateOne({
        prefix: args[0]
      });

      return message.channel.send(`Successfuly Set the prefix to **${args[0]}**`)
    }
};