const { EmbedBuilder, AttachmentBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.js");
let ip = config.ip
const x73db = require("x73db") 
const axios = require('axios'); 
const cheerio = require('cheerio');
const https = require('https');
const dbtoken = new x73db("token")
let fs = require('fs');

const httpsAgent = new https.Agent({ keepAlive: true });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Control your server")
      .addStringOption(option => 
    option.setName('ip')
    .setDescription('Your server ip (ex: 159.65.119.84)')
    .setRequired(true))
.addStringOption(option =>    
    option.setName('port')
    .setDescription('Your server port (ex: 34997)')
    .setRequired(true)),
    run: async (client, interaction) => {

let gettoken = await dbtoken.get(`token${interaction.member.user.id}`)
if(!gettoken) return await interaction.reply({ content: `:x: - **There is no token registered!**\n Use \`/login\` to create your token.`, ephemeral: true });
let name = 'name'
let token = 'token'      
let value1 = await interaction.options.getString("ip")
let password = 'password'
let value2 = await interaction.options.getString("port")
let email = 'email'   
const api = axios.create({baseURL: ip})


let start = new ButtonBuilder()
.setCustomId('start')
.setLabel('▶️ Start')
.setStyle(ButtonStyle.Secondary);

let stop = new ButtonBuilder()
.setCustomId('stop')
.setLabel('⏹️ Stop')
.setStyle(ButtonStyle.Secondary);

let restart = new ButtonBuilder()
.setCustomId('restart')
.setLabel('🔄 Restart')
.setStyle(ButtonStyle.Secondary);



let attachment = new AttachmentBuilder(`https://www.game-state.com/${value1}:${value2}/stats.png`, { name: 'n1cho.png' });

let row = new ActionRowBuilder()
.addComponents( start, stop, restart);


const newEmbed = new EmbedBuilder()
.setColor("#ED4245")
.setTitle("You can manage your server by clicking on this buttons")
.setDescription(`\`\`\`Server Ip: ${value1}\nServer Port: ${value2}\`\`\``)
.setTimestamp()
.setImage(`attachment://n1cho.png`)
.setFooter({ text: 'Powered by N1CHO', iconURL: 'https://media.discordapp.net/attachments/805855151150989402/835613591612162088/20210424_202617.gif' });


 var msg = await interaction.reply({ embeds: [newEmbed],files: [attachment], components: [row], fetchReply: true });
//, files: [attachment]
let filter;//= i =>  i.user.id === interaction.member.user.id;
//i.customId === 'next' &&
const collector = interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

collector.on('collect', async i => {
//if(!filter) return console.log("no!");
if (i.user.id !== interaction.member.user.id) return i.reply({ content: `**:x: - This buttons is not for you!**\nUse the command \`/server\``, ephemeral: true }); 
console.log(i.customId)
if(i.customId == "start") {

 
  api.post(`/ogp_api.php?gamemanager/start`, {
    token: gettoken,
    ip: value1,
    port: value2
})
.then(async (res)  => {
i.update({ embeds: [newEmbed], files: [attachment], components: [row] });
   return await i.reply({ content: res.data.message , ephemeral: true });

});

}else if(i.customId == "stop") {
  api.post(`/ogp_api.php?gamemanager/stop`, {
    token: gettoken,
    ip: value1,
    port: value2
})
.then(async (res)  => {
i.update({ embeds: [newEmbed], files: [attachment], components: [row] });
   return await i.reply({ content: res.data.message , ephemeral: true });
});

}  else if(i.customId == "restart") {
  api.post(`/ogp_api.php?gamemanager/restart`, {
    token: gettoken,
    ip: value1,
    port: value2
})
.then(async (res)  => {

i.update({ embeds: [newEmbed], files: [attachment], components: [row] });
   return await i.reply({ content: res.data.message , ephemeral: true });
});

}  

});

collector.on('end', async i => {

    newEmbed
    .setColor("#ED4245")
    .setTitle("You can manage your server by clicking on this buttons")
    .setDescription(`\`\`\`Server Ip: ${value1}\nServer Port: ${value2}\`\`\``)
    .setTimestamp()
    .setImage(`attachment://n1cho.png`)
 .setFooter({ text: 'Powered by N1CHO', iconURL: 'https://media.discordapp.net/attachments/805855151150989402/835613591612162088/20210424_202617.gif' });
     await msg.edit({ embeds: [newEmbed], components: []});
    console.log(`Collected ${i.size} items`)
});


    }
 };
