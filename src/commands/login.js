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

const httpsAgent = new https.Agent({ keepAlive: true });

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


let user = 'username'
let value1 = await interaction.options.getString("username")
let password = 'password'
let value2 = await interaction.options.getString("password")
const api = axios.create({baseURL: ip})
  
api.post('/ogp_api.php?token/create', {
    user: value1,
    password: value2
})
.then(async res  => {
  
  if(res.data.message == "Invalid login information") return await interaction.reply({ content: `:x: - **${res.data.message}**`, ephemeral: true }).then((e) => {
  console.log(`${res.data.message}`)
     
   });
   await interaction.reply({ content: `✅ - **Successfully logged in**\nToken: ||${res.data.message}||`, ephemeral: true }).then((e) => {
  console.log(`Token successfully saved\n${res.data.message}`)
  token.set(`token${interaction.member.user.id}`, res.data.message)    
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
