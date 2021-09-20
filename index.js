const Discord = require("discord.js");
const config = require("./Data/config.json");
const intents = new Discord.Intents(32767);
const client = new Discord.Client({intents });


client.on("Ready",() =>{
    console.log("All good my g");
})


client.on("messageCreate", (message) =>{




})




client.token(config.token);