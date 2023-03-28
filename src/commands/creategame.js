const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.js");
let ip = config.ip
let serverip = config.serverip
const x73db = require("x73db") 
const axios = require('axios'); 
const cheerio = require('cheerio');
const https = require('https');
const dbtoken = new x73db("token")
const dbserverid = new x73db("serverid")
let fs = require('fs');
const httpsAgent = new https.Agent({ keepAlive: true });
let passmysql = ""
const { createConnection } = require('mysql');
/*const database = createConnection({
    host: "164.92.175.207",
    user: "root",
    password: passmysql,
    database: "ogp_panel"
  
   
});
database.connect((error) => {
    if (error) throw error;
  console.log("Database connected")
});*/
module.exports = {
  data: new SlashCommandBuilder()
    .setName("creategame")
    .setDescription("Create a game server!")
    .addStringOption(option => 
    option.setName('game')
    .setDescription('The game server you want to create!')
    .addChoices(
				{ name: 'MTA:SA', value: 'mtasa' },
				{ name: 'SA-MP', value: 'samp' },
		)
    .setRequired(true))
    .addStringOption(option => 
    option.setName('username')
    .setDescription('Username')
    .setRequired(true))
    .addStringOption(option => 
    option.setName('server')
    .setDescription('Server Name')
    .setRequired(true))
    .addStringOption(option =>    
    option.setName('slots')
    .setDescription('Server Slots')
    .setRequired(true)),
    run: async (client, interaction) => {

let gettoken = await dbtoken.get(`token${interaction.member.user.id}`)
let serverid = await dbserverid.get(`serverid${interaction.member.user.id}`)      
if(!gettoken) return await interaction.reply({ content: `:x: - **There is no token registered!**\n Use \`/login\` to create your token.`, ephemeral: true });    
let game = await interaction.options.getString("game")   
let username = await interaction.options.getString("username")
let homeidx = "";
if(game == "mtasa") {     
let server_name = 'server_name'
let token = 'token'      
let value1 = await interaction.options.getString("server")
let slots = 'slots'
let value2 = await interaction.options.getString("slots")
let remote_server_id = 'remote_server_id'
let value3 = "21"    
let home_cfg_id = 'home_cfg_id'
let value4 = "145"       
let mod_cfg_id = 'mod_cfg_id'
let value5 = "181"           
const api = await axios.create({baseURL: ip})
let port = Math.floor(Math.random() * 30000) + 20000;
let cpw = Math.floor(Math.random() * 30000) + 1000;
let eftp = "1"   
let affinity = "0"
let nice = "0"  
api.post(`/ogp_api.php?user_games/create`, {
    "token": gettoken,
    "remote_server_id": value3,
    "server_name": value1,
    "home_cfg_id": value4,
    "mod_cfg_id": value5,
    "ip": serverip,
    "port": port,
    "control_password": `${cpw}`,
    "enable_ftp": `${eftp}`,
    "ftp_password": `${cpw}`,
    "slots": value2,
    "affinity": `${affinity}`,
    "nice": `${nice}`
}).then(async (res)  => {
  
console.log(res.data)
  if(res.data.message == "This function is restricted to administrator accounts.") return await interaction.reply({ content: `:x: - **${res.data.message}**`, ephemeral: true }).then((e) => {
  console.log(`${res.data.message}`)  
   });
if(res.data.status == "200") return await interaction.reply({ content: `✅ - **Successfully creating a new ${game} server**\nServer Name: ||${value1}||\nSlots: ||${value2}||\nID:||${res.data.message}||`, ephemeral: true }).then(async(e) => {
await dbserverid.set(`${username}${value1}_serverid_${interaction.member.user.id}`, res.data.message)     
console.log(`${game}\nServer Name: ||${value1}||\nSlots: ${value2}\nID:${res.data.message}`) 

await api.post(`/ogp_api.php?user_admin/assign`, {
    token: gettoken,
    home_id: `${res.data.message}`,
    email: username,
    timestamp: 0
})
.then(async (res)  => {
  console.log(res.data)
})
.catch(async error => {
  console.log(error)
  interaction.reply({ content: `:x: - **Wrong informations**`, ephemeral: true }); 


})
     
   });

 //if(res.data.includes("Duplicate entry")) return await interaction.reply({ content: `:x: - **Failed to create game, Server port already in use.**`, ephemeral: true }).then((e) => {console.log(`Failed to create account, name or username already in use.`) });  
await interaction.reply({ content: `:x: - **Error**`, ephemeral: true }).then((e) => {
  console.log(`Error`) 
   });  


})
.catch(async error => {
     console.log(error)
     interaction.reply({ content: `:x: - **Wrong informations**`, ephemeral: true }); 


})
let homeid1 = await dbserverid.get(`${username}${value1}_serverid_${interaction.member.user.id}`)   
console.log(homeidx)


  
} else if(game == "samp") {

let server_name = 'server_name'
let token = 'token'      
let value1 = await interaction.options.getString("name")
let slots = 'slots'
let value2 = await interaction.options.getString("slots")
let remote_server_id = 'remote_server_id'
let value3 = 21    
let home_cfg_id = 'home_cfg_id'
let value4 = 184       
let mod_cfg_id = 'mod_cfg_id'
let value5 = 220           
const api = await axios.create({baseURL: ip})
let port = Math.floor(Math.random() * 30000) + 20000;
let cpw = Math.floor(Math.random() * 30000) + 1000;
let eftp = 1   
let affinity = 0
let nice = 0    
api.post(`/ogp_api.php?user_games/create`, {
    token: gettoken,
    remote_server_id: value3,
    server_name: value1,
    home_cfg_id: value4,
    mod_cfg_id: value5,
    ip: serverip,
    port: port,
    control_password: cpw,
    enable_ftp: eftp,
    ftp_password: cpw,
    slots: value2,
    affinity: affinity,
    nice: nice
})
.then(async (res)  => {
console.log(res.data)
  if(res.data.message == "This function is restricted to administrator accounts.") return await interaction.reply({ content: `:x: - **${res.data.message}**`, ephemeral: true }).then((e) => {
  console.log(`${res.data.message}`)  
   });
   if(res.data.status == "200") return await interaction.reply({ content: `✅ - **Successfully creating a new ${game} server**\nServer Name: ||${value1}||\nSlots: ||${value2}||\nID:||${res.data.message}||`, ephemeral: true }).then((e) => {
  console.log(`${game}\nServer Name: ||${value1}||\nSlots: ${value2}\nID:${res.data.message}`) 
   });

 //if(res.data.includes("Duplicate entry")) return await interaction.reply({ content: `:x: - **Failed to create game, Server port already in use.**`, ephemeral: true }).then((e) => {console.log(`Failed to create account, name or email already in use.`) });  
await interaction.reply({ content: `:x: - **${res.data}**`, ephemeral: true }).then((e) => {
  console.log(`${res.data}`) 
   });  
})
.catch(async error => {
     console.log(error)
     interaction.reply({ content: `:x: - **Wrong informations**`, ephemeral: true }); 


})

}
      
    
    }
 };