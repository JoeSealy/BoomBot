const Discord = require('discord.js');
const config = require('./Data/config.json');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

client.queue =  new Map();

client.login(config.token);