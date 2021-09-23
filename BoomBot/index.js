const Discord = require("discord.js");
const config = require("./Data/config.json");
const {DisTube} = require('distube');
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
    if(command === (("play") || ("p")))
    {
        console.log("play");
       distube.play(message, args.join(" ")); 

    }
    if(command  === ("stop"))
    {
        console.log("stop");
        distube.stop(message);
        message.channel.send("Yo i stopped the music my g");

    }
    if(command === ("skip")){
        distube.skip(message);
        message.channel.send("I skipped this mofo fo yo");
    }
    if(command === ("queue"))
    {
        let queue = distube.getQueue(message);
        message.channel.send("added song to the queue my g" + 
        queue.songs.map((song , id) =>  `${id + 1}.${song.name} -\`${song.formattedDuration}\``).slice(0, 10).join());
    }
    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        const filter = distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter.join(", ") || "Off"));
    }

    if(command === ("effects"))
    {
        for(let i = 0; i <= 6; i++){
             effectsArray.toString();
             effectsArray[i].includes(command)
             const filter = distube.setFilter(message, command);
             message.channel.send("Current queue filter: " + (filter.join(", ") || "Off"));
        }
    }

})




client.login(config.token);