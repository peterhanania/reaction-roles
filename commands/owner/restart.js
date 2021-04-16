const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'restart',
        aliases: [ 'reboot' ],
        description: 'Restarts the bot.',
        category: 'Owner',
        ownerOnly: true
      });
    }

    async run(message) {

      await message.channel.send("Restarting bot");
      process.exit(1)

    }
};
