const Command = require('../../structures/Command');
const Guild = require('../../database/guild');
const { MessageEmbed, DiscordAPIError } = require('discord.js');
const config = require('../../config.json');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'help',
        aliases: ["help", "menu"],
        description: `Display\'s ${config.bot_name || 'Bot'}\'s Help Menu.`,
        category: 'Information',
        cooldown: 3,
      });
    }

    async run(message, args) {
    
    if(!args[0]) {
    
    const embed = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(`${config.bot_name || 'Bot'}'s Command List`)
    .setDescription(`**Please make sure to follow and star the github repo [here](https://github.com/peterhanania/reaction-roles)**`)


    const categories = message.client.utils.removeDuplicates(message.client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category));


    for (const category of categories) {
      embed.addField(`**${category}**`, this.client.commands.filter(cmd => 
        cmd.category === category).map(cmd => `\`${cmd.name}${" ".repeat(12 - Number(cmd.name.length))}:\` - ${cmd.description}`).join('\n'))
    }

    message.channel.send(embed)
    
    } else {
        const cmd = this.client.commands.get(args[0]) || this.client.commands.get(this.client.aliases.get(args[0]));
        if(!cmd) return message.channel.send(`Could not find the following command.`);

        const embed = new MessageEmbed()
        embed.setTitle(`Command: ${cmd.name}`)
        embed.setDescription(cmd.description)
        embed.setFooter(cmd.disabled ? 'This command is currently disabled.' : message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
       
        
        embed.addField('Usage',  `\`${cmd.usage}\``, true)
        embed.addField('category',  `\`${capitalize(cmd.category)}\``, true)

        if(cmd.aliases && cmd.aliases.length) embed.addField('Aliases', cmd.aliases.map(alias => `\`${alias}\``, true).join(', '), true)
        if(cmd.cooldown && cmd.cooldown > 1) embed.addField('Cooldown', `\`${cmd.cooldown}s\``, true)
        if(cmd.examples && cmd.examples.length) embed.addField('__**Examples**__', cmd.examples.map(example => `- \`${example}\``).join('\n'))

        message.channel.send(embed)
  

    }
    

    }
};

