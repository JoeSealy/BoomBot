const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'resume',
    aliases:[''],
    cooldown: 0,
    description: 'Stops music',
    async execute(client, message, args, Discord)
    {
        const channel = message.member.voice.channel;
        if(!channel) return message.channel.send("Yo, get yo B-hind in a channel");

        let queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.channel.send(new MessageEmbed().setDescription("Its all clear bro, link man a song g"));

        if(queue.playing) return message.channel.send(new MessageEmbed().setDescription("We ready play this bro watch yo talkin bout"));

        queue.connection.dispatcher.resume();
        message.react("▶️");
        queue.playing = true;
        return message.channel.send(new MessageEmbed().setDescription("Yo, i be playin this man, lets go"));

    }
}