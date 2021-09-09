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
        
        var status;
        var np;
        var count = 0;
        if(!queue) status = "Ayo nutin in the queue my dude, gitta add sum music yo"
        else
            status = queue.queue   
                .map((x) =>
                {
                    count += 1;
                    return
                    (
                        "• " +
                        "`" +
                        count +
                        "." +
                        "`" +
                        x.name +
                        " -Requested by " +
                        `<@${x.requested.id}>`
                    )
                })
                .join("\n");
                if(!queue) np = status;
                else np = queue.queue[0].name;

                if(queue) thumbnail = queue.queue[0].thumbnail;
                else thumbnail = message.guild.iconURL();
                message.channel.send(new MessageEmbed()
                .setAuthor("Music Queue", "https://img.icons8.com/color/2x/rhombus-loader.gif")
                .setThumbnail(thumbnail)
                .setColor("RED")
                .addField("Be Playing", np, true)
                .setDescription(status)
                )
    }
}