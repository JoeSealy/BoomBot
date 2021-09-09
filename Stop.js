
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stop',
    aliases:['end'],
    cooldown: 0,
    description: 'Stops music',
    async execute(client, message, args, Discord)
    {
        const channel = message.member.voice.channel;
        if(!channel) return message.channel.send("Yo, get yo B-hind in a channel");

        let queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.channel.send(new MessageEmbed().setDescription(":x: There are no songs playing in this server."));

        queue.connection.dispatcher.end()
        queue.queue = []
        return message.channel.send(new MessageEmbed().setDescription("Yo, imma stop da beats dog").setColor("PURPLE"));

    }
}