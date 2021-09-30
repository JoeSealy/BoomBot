const Discord = require("discord.js");
const config = require("./Data/config.json");
const {DisTube, DisTubeError} = require('distube');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({intents });

const distube = new DisTube(client, {searchSongs: 1, emitNewSongOnly: true});
const effectsArray = new Array("3d", "bassboost", "echo", "karaoke", "nightcore", "vaporwave");
client.on("ready",() =>{
    console.log("All good my g");
})

client.on("messageCreate", async (message) =>{
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift();

    if(command  === "ping")
    {
        console.log("ping");
        message.channel.send({
            content: `>>> Ping :- ${client.ws.ping}ms`
        })

    }
    if(command  === ("say"))
    {
        message.channel.send({
            content: message.content.slice(4)

        })
    }
    if(command === ("help"))
    {
        message.channel.send("$play, $stop, $skip, $queue, options for songs === $3d, $bassboost, $echo, $karaoke, $nightcore, $vaporwave")
    }


    //MUSIC TIME 
    if(command === (("play"||"p")))
    {
        distube.play(message, args.join(" ")); 
        message.channel.send(
            "i be playing..."
        )
        message.channel.send({
            content: message.content.slice(5)

        })
    }

    if(command  === ("stop"))
    {
        console.log("stop");
        distube.stop(message);
        message.channel.send("Yo i stopped the music my g");

    }

    if(command === ("skip"))
    {
        distube.skip(message);
        message.channel.send("I skipped this mofo fo yo");
    }

    if(command ===("seek"))
    {
       distube.seek(message, Number(args[0]))
       message.channel.send(`i moved the time to ${message} `);
    }

    if(command === ("queue"))
    {
        const queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
        `**${id+1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``
        ).join("\n"));
    }

    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) 
    {
        const filter = distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter.join(", ") || "Off"));
    }

})




client.login(config.token);