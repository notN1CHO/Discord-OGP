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
const QuickDatabase = new x73db("database")
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: config.mysqlhost,
    user: config.mysqluser,
    password: config.mysqlpw,
    database: config.mysqldb
   // port: //1598
  });
  connection.connect((err) => {
    if (err) {
      console.error('panel command Error connecting to MySQL:', err);
      return;
    }
    console.log('panel command Connected to MySQL server');
  })
  let msgpww;
  let msgps;
  let msgpw;
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
    .setName("panel")
    .setDescription("Shows your servers information and control them from Discord !"),
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
if(!gettoken) return await interaction.reply({ content: `:x: - **There is no token registered!**\nUse \`/login\` to create your token.`, ephemeral: true });
const hasData = await getData(interaction.user.id);
if (!hasData) return await interaction.reply({ content: "You need to login first to use this command.\nUse \`/login\` to login.", ephemeral: true });
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

connection.query(`SELECT * FROM ogp_user_homes WHERE user_id='${hasData.user_id}'`, async function(error1, results1) {
  let description;
  if (error1) {
      return await interaction.reply({ content: "There was an error calling the database, please contact staff.\n```" + error1.sqlMessage + "```", ephemeral: true });
  };

  if (results1.length < 1) {
      return await interaction.reply({ content: "There is no servers assigned to your account." });
  };

  const embeds = [];
  const pages = {};
  for (let i = 0; i < results1.length; i++) {
      let serverData = await getServerData(results1[i].home_id);
      let serverPort = await getServerPort(results1[i].home_id);
     description = `\`\`\`Server ID: ${serverData.home_id}\nServer Name: ${serverData.home_name}\nServer IP: ${config.serverip}\nServer Port: ${serverPort}\n[F8]: connect ${config.serverip}:${serverPort}\`\`\``
      embeds.push(
          new EmbedBuilder()
          .setColor("#ED4245")
          .setTitle("You can manage your server by clicking on the buttons.")
          .setDescription(description)
          .setThumbnail(logos[serverData.home_cfg_id])
        //  .setFooter({ text: 'Powered by Ares Host', iconURL: 'https://cdn.discordapp.com/icons/896440235917971476/a_289409a97d2ec1e2995f3650aa5d3513.gif?size=1024' })
      );
  }

  const getRow = (id) => {
      const row = new ActionRowBuilder()

      row.addComponents(
          new ButtonBuilder()
              .setCustomId("prev_embed")
              .setStyle(ButtonStyle.Secondary)
              .setLabel("⬅️ Back")
              .setDisabled(pages[id] == 0)
      )

      row.addComponents(
          new ButtonBuilder()
              .setCustomId("startp")
              .setStyle(ButtonStyle.Secondary)
              .setLabel("▶️ Start")
      )

      row.addComponents(
          new ButtonBuilder()
              .setCustomId("stopp")
              .setStyle(ButtonStyle.Secondary)
              .setLabel("⏹️ Stop")
      )

      row.addComponents(
          new ButtonBuilder()
              .setCustomId("restartp")
              .setStyle(ButtonStyle.Secondary)
              .setLabel("🔄 Restart")
      )
      
      row.addComponents(
          new ButtonBuilder()
              .setCustomId("next_embed")
              .setStyle(ButtonStyle.Secondary)
              .setLabel("➡️ Next")
              .setDisabled(pages[id] === embeds.length - 1)
      )

      return row;
  }

  const id = interaction.user.id;
  pages[id] = pages[id] || 0;

  const embed = embeds[pages[id]];

  const time = 1000 * 60 * 5;
  const rows = getRow(id);
  var reply = await interaction.reply({ embeds: [embed], components: [rows], fetchReply: true });
  let filter;
  const collector = interaction.channel.createMessageComponentCollector({ filter, time: 1800000 });
 // const collector = reply.createMessageComponentCollector({ });//componentType: ComponentType.Button
  collector.on("collect", async (btnInt) => {
      if (!btnInt) {
        return;
      }

      if (btnInt.user.id !== id) return await btnInt.reply({ content: `**:x: - This buttons is not for you!**\nUse the command \`/panel\`.`, ephemeral: true });

     // btnInt.deferUpdate();

      if (
        btnInt.customId !== "prev_embed" &&
        btnInt.customId !== "next_embed" &&
        btnInt.customId !== "startp" &&
        btnInt.customId !== "restartp" &&
        btnInt.customId !== "stopp"
      ) {
        return;
      }
      var ydata = description.toString().split("connect ")[1].split("```")[0].split(`:`)
      //.split("Ip: ")[1].split("```")[0].split(`Port: `)
      var yip = ydata[0];
      var yport = ydata[1];

      if (btnInt.customId === "startp") {
        console.log(gettoken, config.serverip,yport)
        msgpww = await btnInt.reply({ content: "Starting the server, please wait !" , ephemeral: true });
        await api.post(`/ogp_api.php?gamemanager/start`, {
              token: gettoken,
              ip: config.serverip,
              port: yport
          }).then(async function (response) {
           
              await interaction.guild.channels.fetch();
              //await interaction.channel.sendTyping();
              await  msgpww.edit({ content: response.data.message , ephemeral: true });
          }).catch(async function (error) {
              await interaction.guild.channels.fetch();
              //await interaction.channel.sendTyping();
             // await  msgpww.edit({ content: "There was a problem while starting the server, please contact our Support team <#1063053927337177108>" , ephemeral: true });
             // await interaction.channel.send({ content: "There was a problem while starting the server, please contact our team.", ephemeral: true });
              console.log(error);
          });
      }

      if (btnInt.customId === "stopp") {
        msgps = await btnInt.reply({ content: "Stopping the server, please wait !" , ephemeral: true });
        await api.post(`/ogp_api.php?gamemanager/stop`, {
              token: gettoken,
              ip: config.serverip,
              port: yport
          }).then(async function (response) {
              await interaction.guild.channels.fetch();
              //await interaction.channel.sendTyping();
              await  msgps.edit({ content: response.data.message , ephemeral: true });
          }).catch(async function (error) {
              await interaction.guild.channels.fetch();
             // await interaction.channel.sendTyping();
              //await  msgps.edit({ content: "There was a problem while starting the server, please contact our Support team <#1063053927337177108>" , ephemeral: true });              console.log(error);
          });
      }

      if (btnInt.customId === "restartp") {
        msgpw = await btnInt.reply({ content: "Restartring the server, please wait !" , ephemeral: true });
          await api.post(`/ogp_api.php?gamemanager/restart`, {
              token: gettoken,
              ip: config.serverip,
              port: yport
          }).then(async function (response) {
            console.log(response)
              await interaction.guild.channels.fetch();
              //await interaction.channel.sendTyping();
              await  msgpw.edit({ content: response.data.message , ephemeral: true });
          }).catch(async function (error) {
              await interaction.guild.channels.fetch();
            //  await interaction.channel.sendTyping();
             // await  msgpw.edit({ content: "There was a problem while starting the server, please contact our Support team <#1063053927337177108>" , ephemeral: true });              console.log(error);
              console.log(error);
          });
      }

      if (btnInt.customId === "prev_embed" && pages[id] > 0) {
        --pages[id];
      } else if (
        btnInt.customId === "next_embed" &&
        pages[id] < embeds.length - 1
      ) {
        ++pages[id];
      }

      interaction.editReply({
          embeds: [embeds[pages[id]]],
          components: [getRow(id)],
      });
  });
  collector.on('end', async i => {
console.log(description)
    embed
      .setDescription(description)
      .setColor("#ED4245")
      .setTitle("You can manage your servers by clicking on this buttons.")
      .setTimestamp()
      .setThumbnail(logos[145])
      //.setFooter({ text: 'Powered by Ares Host', iconURL: 'https://cdn.discordapp.com/icons/896440235917971476/a_289409a97d2ec1e2995f3650aa5d3513.gif?size=1024' });     
     // await i.update({ embeds: [embed], components: []});
     await reply.edit({ embeds: [embed], components: []});
    console.log(`Collected ${i.size} items`)
});
});
    }
 };


 async function getData(id) {
  const data = await QuickDatabase.get(id);
  if (data) {
      return data;
  } else {
      return false;
  };
};

async function getServerData(id) {
  return new Promise(function(reslove, reject) {
      connection.query(`SELECT * FROM ogp_server_homes WHERE home_id='${id}'`, async function(error2, results2) {
          if (error2) {
              reslove(false);
          };

          reslove(results2[0]);
      });
  });
}

async function getServerPort(id) {
  return new Promise(function(reslove, reject) {
      connection.query(`SELECT * FROM ogp_home_ip_ports WHERE home_id='${id}'`, async function(error2, results2) {
          if (error2) {
              reslove(false);
          };

          reslove(results2[0].port);
      });
  });
}

function getSecondPart(str) {
  return str.split('\`-\` Server Port: ')[1];
}
