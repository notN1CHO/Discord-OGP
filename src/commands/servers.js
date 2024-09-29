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
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: config.mysqlhost,
    user: config.mysqluser,
    password: config.mysqlpw,
    database: config.mysqldb
   // port: //1598
  });
  let msgww;
  let msgs;
  let msgw;
  connection.connect((err) => {
    if (err) {
      console.error('servers command Error connecting to MySQL:', err);
      return;
    }
    console.log('servers command Connected to MySQL server');
  })
  
  const logos = {
    127: "https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png",
    128: "https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png",
    129: "https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png",
    130: "https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png",
    140: "https://multitheftauto.com/mtasa_icon_hq.png",
    141: "https://multitheftauto.com/mtasa_icon_hq.png",
    142: "https://multitheftauto.com/mtasa_icon_hq.png",
    143: "https://multitheftauto.com/mtasa_icon_hq.png",
    145: "https://multitheftauto.com/mtasa_icon_hq.png"
  }

module.exports = {
  data: new SlashCommandBuilder()
    .setName("servers")
    .setDescription("Shows all servers information"),
      /*.addStringOption(option => 
    option.setName('ip')
    .setDescription('Your server ip (ex: 159.65.119.84)')
    .setRequired(true))
.addStringOption(option =>    
    option.setName('port')
    .setDescription('Your server port (ex: 34997)')
    .setRequired(true)),*/
    run: async (client, interaction) => {

let gettoken = await dbtoken.get(`token${interaction.member.user.id}`)
if(!gettoken) return await interaction.reply({ content: `:x: - **There is no token registered!**\n Use \`/login\` to create your token.`, ephemeral: true });
let name = 'name'
let token = 'token'      
let value1 = await interaction.options.getString("ip")
let password = 'password'
let value2 = await interaction.options.getString("port")
let email = 'email'
//let value3 = await interaction.options.getString("email")      
const api = axios.create({baseURL: ip})
      

//get.data.reciters.filter((r)=> {})[0]
//console.log(y+1, yay.moshaf[y].name == "Rewayat Hafs A'n Assem - Murattal")


let get = await api.post(`/ogp_api.php?user_games/list_servers`, {
    token: gettoken
});

let ai0 = 0;

let ai1 = 1;


let i0 = 0;

let i1 = 1;

let page = 1;
const timestampToDate = require('timestamp-to-date');

console.log(get.data.message[1], get.data.message[2])

if(get.data.message == "This function is restricted to administrator accounts.") return interaction.reply({ content: get.data.message, ephemeral: true})
//console.log(timestampToDate())
//console.log(timestampToDate('1484448039504','yyyy-MM-dd HH:mm:ss')) 

//const owner = await guild.members.fetch(guild.ownerID);
let attachmentx;

let serverPortArray = await Promise.all(
  get.data.message
    .sort((a, b) => a.home_id - b.home_id)
    .map(r => r.home_id)
    .map(getServerPort)
);

let description =
  `\n\n` +

  get.data.message

    .sort((a, b) => a.home_id - b.home_id)

    .map(r => r)

    .map((r, i) => 
       
     

        `\`\`\`Server Rank: #${i + 1}\nServer ID: ${r.home_id}\nServer Name: ${r.home_name}\nServer Ip: ${r.agent_ip}\nServer Port: ${serverPortArray[i]}\n[F8]: connect ${r.agent_ip}:${serverPortArray[i]}\`\`\``
    )
 
    .slice(0, 1)

    .join("\n");
    console.log("zz", description)

/*
    let field =
  
    get.data.message
  
      .sort((a, b) => a.home_id - b.home_id)
  
      .map(r => r)
  
      .map((r, i) => 
        `\`\`\`mtasa://${r.agent_ip}:${serverPortArray[i]}\`\`\`\n\`\`\`[F8]: connect ${r.agent_ip}:${serverPortArray[i]}\`\`\``)
   
      .slice(0, 1)
  
      .join("\n");*/

//\nServer Expiration Date: ${timestampToDate(`${r.server_expiration_date}`,'yyyy-MM-dd HH:mm:ss')}
  let img;
let n;
  get.data.message

  .sort((a, b) => b.home_id - a.home_id)

  .map(r => r)

  .map((r, i) => 
     {
  if(r.game_name == "Multi Theft Auto") {
    img = "http://media.moddb.com/images/downloads/1/47/46326/mtasa.png"
    } else {
      img = "https://icons.veryicon.com/png/o/business/monitoring-system-and-office/1-client.png"
    }
  n = r.custom_fields
  })

  .slice(0, 1)

  .join("\n");
  console.log(n)
    get.data.message
  
      .sort((a, b) => b.home_id - a.home_id)
  
      .map(r => r)
  
      .map((r, i) => 
         
  
      attachmentx = new AttachmentBuilder(`https://www.game-state.com/${r.agent_ip}:${serverPortArray[i]}/stats.png`, { name: 'n1cho.png' })      )
   
      .slice(0, 1)
  

   
var json = get.data.message
      let nice;
      for (var ii = 1, l = Object.keys(json).length; ii <= l; ii++) {
         nice = l
      }


console.log(description)


let back = new ButtonBuilder()
.setCustomId('back')
.setLabel('⬅️ Back')
.setStyle(ButtonStyle.Secondary)
.setDisabled(true);

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

let next = new ButtonBuilder()
.setCustomId('next')
.setLabel('➡️ Next')
.setStyle(ButtonStyle.Secondary)
.setDisabled(false);



let row = new ActionRowBuilder()
    .addComponents(back, start, stop, restart, next);


const newEmbed = new EmbedBuilder()
.setAuthor({ name: `Total Servers: ${nice}`})
.setColor("#ED4245")
.setTitle("You can manage your servers by clicking on this buttons")
.setDescription(description)
//.setThumbnail(logos[145])
.setTimestamp()
//.setThumbnail(img)
//////.setImage(`attachment://n1cho.png`)
//.setFooter({ text: 'Powered by Ares Host', iconURL: 'https://cdn.discordapp.com/icons/896440235917971476/a_289409a97d2ec1e2995f3650aa5d3513.gif?size=1024' });

//console.log(get.data.message)
for (let y = 0; y < `${217 + 1}`; y++) {  

//let yay = get.message.filter((r)=> {})[0]
//newEmbed.setTitle(get.data.message.cache)
//console.log(get.data.message[y].custom_fields, get.data.message[y].server_expiration_date)

}   

 var msg = await interaction.reply({ embeds: [newEmbed], components: [row], fetchReply: true });//.then(msg => {msg.delete({ timeout: 30000 })});
//, files: [attachment]
let filter; //= i =>  i.user.id === interaction.member.user.id;
//i.customId === 'next' &&
const collector = interaction.channel.createMessageComponentCollector({ filter, time: 1800000 });

collector.on('collect', async i => {
//if(!filter) return console.log("no!");
if (i.user.id !== interaction.member.user.id) return i.reply({ content: `**:x: - This buttons is not for you!**\nUse the command \`/server\`.`, ephemeral: true }); 
console.log(i.customId)
if(i.customId == "next") {

    back.setDisabled(false);




    i0 = i0 + 1;

    i1 = i1 + 1;

    page = page + 1;

    page = page + 1;
    // if there is no guild to display, delete the message


//console.log(get.data.parse.length)



//Object.keys(json).length --> USE




    if (i1 > nice - 1) {



        next.setDisabled(true);



       // return console.log("stopppa");

      }

    if (i0 + 1 < 0) {

      console.log(i0)

      return console.log("a");

    }

    if (!i0 || !i1) {

      return console.log("a")//msg.delete();

    }






    description =
      `\n\n` +

      get.data.message

        .sort((a, b) => a.home_id - b.home_id)

        .map(r => r)

        .map((r, i) =>  `\`\`\`Server Rank: #${i + 1}\nServer ID: ${r.home_id}\nServer Name: ${r.home_name}\nServer Ip: ${r.agent_ip}\nServer Port: ${serverPortArray[i]}\n[F8]: connect ${r.agent_ip}:${serverPortArray[i]}\`\`\``)


        .slice(i0, i1)

        .join("\n");



console.log(description)

//let yay = get.message.filter((r)=> {})[0]
//newEmbed.setTitle(get.data.message.cache)

get.data.message

  .sort((a, b) => b.home_id - a.home_id)

  .map(r => r)

  .map((r, i) => 
     {
  if(r.game_name == "Multi Theft Auto") {
    img = "http://media.moddb.com/images/downloads/1/47/46326/mtasa.png"
    } else {
      img = "https://icons.veryicon.com/png/o/business/monitoring-system-and-office/1-client.png"
    }
  n = r.custom_fields
  })

  .slice(0, 1)

  .join("\n");
  console.log(n)
var ydata = description.toString().split("connect ")[1].split("```")[0].split(`:`)
//.split("Ip: ")[1].split("```")[0].split(`Port: `)
var yip = ydata[0];
var yport = ydata[1];

//attachment = new AttachmentBuilder(`https://www.game-state.com/${yip}:${yport}/stats.png`, { name: 'n1cho.png' });

   
    newEmbed
      .setDescription(description)
      .setColor("#ED4245")
      .setTitle("You can manage your servers by clicking on this buttons")
      .setTimestamp()
      //.setThumbnail(img)
      .setThumbnail(logos[145])
      //.setImage(`attachment://n1cho.png`)
      .setFooter({ text: 'Powered by Ares Host', iconURL: 'https://cdn.discordapp.com/icons/896440235917971476/a_289409a97d2ec1e2995f3650aa5d3513.gif?size=1024' });
      



    // Edit the message
    return await i.update({ embeds: [newEmbed], components: [row] });
} else if(i.customId == "back") {
console.log(i.customId)
    next.setDisabled(false);






    i0 = i0 - 1;

    i1 = i1 - 1;

    page = page - 1;



    // if there is no guild to display, delete the message
//hna

    if (i1 < nice - 1) {



       // back.setDisabled(true);
 


       // return console.log("stopppa");

      }

    if (i0 + 1 < 0) {

      console.log(i0)
      back.setDisabled(true);
      //return console.log("a");

    }

    if (!i0 || !i1) {
        back.setDisabled(true);
     // return console.log("a");

    }
//hta lhna




//console.log(get.data.parse.length)


//Object.keys(json).length --> USE








    description =
      `\n\n` +

      get.data.message

        .sort((a, b) => a.home_id - b.home_id)

        .map(r => r)

        .map((r, i) =>  `\`\`\`Server Rank: #${i + 1}\nServer ID: ${r.home_id}\nServer Name: ${r.home_name}\nServer Ip: ${r.agent_ip}\nServer Port: ${serverPortArray[i]}\n[F8]: connect ${r.agent_ip}:${serverPortArray[i]}\`\`\``)



        .slice(i0, i1)

        .join("\n");



console.log(description)

//let yay = get.message.filter((r)=> {})[0]
//newEmbed.setTitle(get.data.message.cache)


get.data.message

  .sort((a, b) => b.home_id - a.home_id)

  .map(r => r)

  .map((r, i) => 
     {
  if(r.game_name == "Multi Theft Auto") {
    img = "http://media.moddb.com/images/downloads/1/47/46326/mtasa.png"
    } else {
      img = "https://icons.veryicon.com/png/o/business/monitoring-system-and-office/1-client.png"
    }
  n = r.custom_fields
  })

  .slice(0, 1)

  .join("\n");
  console.log(n)

  
var ydata = description.toString().split("connect ")[1].split("```")[0].split(`:`)
//.split("Ip: ")[1].split("```")[0].split(`Port: `)
var yip = ydata[0];
var yport = ydata[1];

//attachment = new AttachmentBuilder(`https://www.game-state.com/${yip}:${yport}/stats.png`, { name: 'n1cho.png' })
   // console.log(attachment)
    newEmbed
      .setDescription(description)
      .setColor("#ED4245")
      .setTitle("You can manage your servers by clicking on this buttons")
      .setTimestamp()
      .setThumbnail(logos[145])
     // .setThumbnail(img)
      //.setImage(`attachment://n1cho.png`)
      .setFooter({ text: 'Powered by Ares Host', iconURL: 'https://cdn.discordapp.com/icons/896440235917971476/a_289409a97d2ec1e2995f3650aa5d3513.gif?size=1024' });
      



    // Edit the message
    return await i.update({ embeds: [newEmbed], components: [row] });
} else if(i.customId == "start") {

  //var data = interaction.interaction//.description[0].value.toString().split("Ip: ")[1].split("```")[0].split(`Port: `)
  //var time = smithmsg.message.embeds[0].fields[1].value.toString().split(`<t:`)[1].split(`:R>`)[0]
  var data = description.toString().split("connect ")[1].split("```")[0].split(`:`)
  //.split("Ip: ")[1].split("```")[0].split(`Port: `)
  var ip = data[0];
  var port = data[1];
  msgww = await i.reply({ content: "Starting the server, please wait !" , ephemeral: true });


  //attachment = new AttachmentBuilder(`https://www.game-state.com/${ip}:${port}/stats.png`, { name: 'n1cho.png' })
console.log(ip, port)
//return console.log(ip, `\n${port}`)
  api.post(`/ogp_api.php?gamemanager/start`, {
    token: gettoken,
    ip: ip,
    port: port
})
.then(async (res)  => {
/*
    const Embed = new EmbedBuilder()
    .setColor("#ED4245")
    .setTitle('Managing Server:')
    .setDescription(res.data.message)
    .setTimestamp()
    //.setImage(`attachment://n1cho.png`)
    .setFooter({ text: 'AresHost', iconURL: 'https://media.discordapp.net/attachments/805855151150989402/835613591612162088/20210424_202617.gif' });
*/
i.update({ embeds: [newEmbed], components: [row] });
   return await  msgww.edit({ content: res.data.message , ephemeral: true });
   i.deferUpdate(); 
//await i.update({ content: res.data.message});
});

}else if(i.customId == "stop") {

  //var data = interaction.interaction//.description[0].value.toString().split("Ip: ")[1].split("```")[0].split(`Port: `)
  //var time = smithmsg.message.embeds[0].fields[1].value.toString().split(`<t:`)[1].split(`:R>`)[0]
  var data = description.toString().split("connect ")[1].split("```")[0].split(`:`)
  //.split("Ip: ")[1].split("```")[0].split(`Port: `)
  var ip = data[0];
  var port = data[1];

  msgs = await i.reply({ content: "Stopping the server, please wait !" , ephemeral: true });

  //attachment = new AttachmentBuilder(`https://www.game-state.com/${ip}:${port}/stats.png`, { name: 'n1cho.png' })
console.log(ip, port)
//return console.log(ip, `\n${port}`)
  api.post(`/ogp_api.php?gamemanager/stop`, {
    token: gettoken,
    ip: ip,
    port: port
})
.then(async (res)  => {
/*
    const Embed = new EmbedBuilder()
    .setColor("#ED4245")
    .setTitle('Managing Server:')
    .setDescription(res.data.message)
    .setTimestamp()
    //.setImage(`attachment://n1cho.png`)
    .setFooter({ text: 'AresHost', iconURL: 'https://media.discordapp.net/attachments/805855151150989402/835613591612162088/20210424_202617.gif' });
*/
i.update({ embeds: [newEmbed], components: [row] });
   return await msgs.edit({ content: res.data.message , ephemeral: true });
   i.deferUpdate(); 
//await i.update({ content: res.data.message});
});

}  else if(i.customId == "restart") {

  //var data = interaction.interaction//.description[0].value.toString().split("Ip: ")[1].split("```")[0].split(`Port: `)
  //var time = smithmsg.message.embeds[0].fields[1].value.toString().split(`<t:`)[1].split(`:R>`)[0]
  var data = description.toString().split("connect ")[1].split("```")[0].split(`:`)
  //.split("Ip: ")[1].split("```")[0].split(`Port: `)
  var ip = data[0];
  var port = data[1];

   msgw = await i.reply({ content: "Restartring the server, please wait !" , ephemeral: true });

  //attachment = new AttachmentBuilder(`https://www.game-state.com/${ip}:${port}/stats.png`, { name: 'n1cho.png' })
console.log(ip, port)
//return console.log(ip, `\n${port}`)
  api.post(`/ogp_api.php?gamemanager/restart`, {
    token: gettoken,
    ip: ip,
    port: port
})
.then(async (res)  => {
/*
    const Embed = new EmbedBuilder()
    .setColor("#ED4245")
    .setTitle('Managing Server:')
    .setDescription(res.data.message)
    .setTimestamp()
    //.setImage(`attachment://n1cho.png`)
    .setFooter({ text: 'AresHost', iconURL: 'https://media.discordapp.net/attachments/805855151150989402/835613591612162088/20210424_202617.gif' });
*/
i.update({ embeds: [newEmbed], components: [row] });

   return await msgw.edit({ content: res.data.message , ephemeral: true });
   i.deferUpdate(); 
//await i.update({ content: res.data.message});
});

}  

});

collector.on('end', async i => {

    newEmbed
      .setDescription(description)
      .setColor("#ED4245")
      .setTitle("You can manage your servers by clicking on this buttons")
      .setTimestamp()
      .setThumbnail(logos[145])
      //.setThumbnail(img)
     ////.setImage(`attachment://n1cho.png`)
      .setFooter({ text: 'Powered by Ares Host', iconURL: 'https://cdn.discordapp.com/icons/896440235917971476/a_289409a97d2ec1e2995f3650aa5d3513.gif?size=1024' });
      



     await msg.edit({ embeds: [newEmbed], components: []});
    console.log(`Collected ${i.size} items`)
});


    }
 };

 async function getServerPort(id) {
  return new Promise(function(reslove, reject) {
      connection.query(`SELECT * FROM ogp_home_ip_ports WHERE home_id='${id}'`, async function(error2, results2) {
          if (error2) {
              reslove(false);
          };
          //console.log(results2[0].port)
          reslove(results2[0].port);
      });
  });
}

