const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue =  new Map();

module.exports = {
    name: 'play',
    aliases:['skip', 'stop'],
    cooldown: 0,
    description: 'BoomBot',
    async execute(message,args,cmd,client,Discord)
    {
        const voice_channel = message.member.voice.channel;                                                 //gets voice channel the user is in 
        if(!voice_channel)return message.channel.send("Get yo ass in a channel befow i be joinin dog.");    //checks if user is in a voice channel


      //  const permissions = voice_channel.permissionsFor(message.client.user);                              //Allows certain users to run the bot
       // if(!permissions.has("CONNECT"))return message.channel.send("Yo top dog aint gav u perms yo");
      //  if(!permissions.has("SPEAK"))return message.channel.send("Yo top dog aint gav u perms yo");
        
        const server_queue = queue.get(message.guild.id);

        if(cmd == "$play")
        {
            if(!args.length) return message.channel.send("bro, tell me what track to play DAYUM");
            let song = {};

            if(ytdl.validateURL(args[0]))
            {
                const song_info = await ytdl.getInfo(args[0]);
                song = {title: song_info.videoDetails.title, url:song_info.videoDetails.video_url}
            }
            else
            {
                const video_finder = async (query) =>
                {
                const videoResult = await ytSearch(query);
                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;

                } 
                const video = await video_finder(args.join(" "));
                if(video)
                {
                    song  = {title: video.title, url: video.url}
                }
                else
                {
                    message.channel.send("Yo, i could find the music maaan");
                }
            }


        }



    }
}