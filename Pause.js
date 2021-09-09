const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'pause',
    aliases:[''],
    cooldown: 0,
    description: 'Stops music',
    async execute(client, message, args, Discord)
    {
        const channel = message.member.voice.channel;
        if(!channel) return message.channel.send("Yo, get yo B-hind in a channel");

        let queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send(new MessageEmbed().setDescription("Its all clear bro, link man a song g"));

        if(!queue.playing) return message.channel.send(new MessageEmbed().setDescription("Yo, this track aint playin nutin bro."));

        queue.connection.dispatcher.pause();
        message.react("⏸️");
        queue.playing = false;
        return message.channel.send(new MessageEmbed().setDescription("Yo, i paused, do whatch yo gone do"));

    }
}