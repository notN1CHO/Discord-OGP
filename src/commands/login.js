const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.js");
let ip = config.ip
const x73db = require("x73db") 
const axios = require('axios'); 
const cheerio = require('cheerio');
const https = require('https');
const token = new x73db("token")
let fs = require('fs');
const QuickDatabase = new x73db("database")
const httpsAgent = new https.Agent({ keepAlive: true });
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
      console.error('login command Error connecting to MySQL:', err);
      return;
    }
    console.log('login command Connected to MySQL server');
  })
  
module.exports = {
  data: new SlashCommandBuilder()
    .setName("login")
    .setDescription("Get your token using your username and password!")
      .addStringOption(option => 
    option.setName('username')
    .setDescription('Your Username')
    .setRequired(true))
.addStringOption(option =>    
    option.setName('password')
    .setDescription('Your Password')
    .setRequired(true)),
    run: async (client, interaction) => {


let value1 = await interaction.options.getString("username")
let value2 = await interaction.options.getString("password")
const api = axios.create({baseURL: ip})
await api
await api.post('/ogp_api.php?token/create', {
    user: value1,
    password: value2
})
.then(async res  => {
    console.log(`${res.data.message}`)
  if(res.data.message == "Invalid login information") return await interaction.reply({ content: `:x: - **${res.data.message}**`, ephemeral: true }).then((e) => {     
   });
   if(res.data.status == "200") return await interaction.reply({ content: `✅ - **Successfully logged in**\nToken: ||${res.data.message}||`, ephemeral: true }).then((e) => {
  console.log(`Token successfully saved\n${res.data.message}`)
  token.set(`token${interaction.member.user.id}`, res.data.message)    
  connection.query(`SELECT * FROM ogp_users WHERE users_login='${value1}'`, async function(error, results) {
    await console.log(`${value2} AGP Account is now connected with this discord account (ID: ${interaction.user.id}).`);
    await QuickDatabase.set(interaction.user.id, results[0]);
});
   });
   await interaction.reply({ content: `${res.data.message}`, ephemeral: true }).then((e) => {
    console.log(`${res.data.message}`)

     });
  
  
})
.catch(async error => {
     console.log(error)
     interaction.reply({ content: `:x: - **Wrong informations**`, ephemeral: true }); 


})



  /* 
axios
    .get(`${ip}/test_api.php`, {
        httpsAgent,
        params: {
            cat_id: '876',
        },
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
        },
        //is the same as set the entire url
    })
    .then((res) => {
        let status = res.status;
        console.log(status);
        //This should now output the html content
        console.log(res.data);
    })
    .catch(err => console.error(err));

*/
      
    
    }
 };
