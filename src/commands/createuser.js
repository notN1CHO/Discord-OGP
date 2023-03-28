const { EmbedBuilder, PermissionsBitField } = require("discord.js");
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
    .setName("createuser")
    .setDescription("Create a user!")
      .addStringOption(option => 
    option.setName('username')
    .setDescription('Your Username')
    .setRequired(true))
.addStringOption(option =>    
    option.setName('password')
    .setDescription('Your Password')
    .setRequired(true)),
    run: async (client, interaction) => {

let gettoken = await dbtoken.get(`token${interaction.member.user.id}`)
if(!gettoken) return await interaction.reply({ content: `:x: - **There is no token registered!**\n Use \`/login\` to create your token.`, ephemeral: true });
let name = 'name'
let token = 'token'      
let value1 = await interaction.options.getString("username")
let password = 'password'
let value2 = await interaction.options.getString("password")
let email = 'email'
let value3 = await interaction.options.getString("email")      
const api = axios.create({baseURL: ip})
      
api.post(`/ogp_api.php?user_admin/create`, {
    token: gettoken,
    name: value1,
    password: value2,
    email: value1
})
.then(async (res)  => {
console.log(res.data)
  if(res.data.message == "This function is restricted to administrator accounts.") return await interaction.reply({ content: `:x: - **${res.data.message}**`, ephemeral: true }).then((e) => {
  console.log(`${res.data.message}`)  
   });
   if(res.data.message == "Account created") return await interaction.reply({ content: `✅ - **Successfully creating a new account**\nUser: ||${value1}||\nPassword: ||${value2}||`, ephemeral: true }).then((e) => {
  console.log(`${res.data.message}\nUser: ${value1}\nPassword: ${value2}`) 
   });

 if(res.data.includes("Duplicate entry")) return await interaction.reply({ content: `:x: - **Failed to create account, name or email already in use.**`, ephemeral: true }).then((e) => {
  console.log(`Failed to create account, name or email already in use.`) 
   });  
await interaction.reply({ content: `:x: - **${res.data}**`, ephemeral: true }).then((e) => {
  console.log(`${res.data}`) 
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
