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
const mysql = require('mysql');
const querystring = require('querystring');

const connection = mysql.createConnection({
  host: config.mysqlhost,
  user: config.mysqluser,
  password: config.mysqlpw,
  database: config.mysqldb
 // port: //1598
});
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server');
})

/* Updating same users and emails

const updateUsersEmail = () => {
  const selectSql = 'SELECT users_login FROM ogp_users'; // Replace your_table_name with the actual table name.
  connection.query(selectSql, (err, rows) => {
    if (err) {
      console.error('Error selecting users_login:', err.message);
      connection.end();
      return;
    }

    // Assuming your_table_name has a column named 'users_email', you can update the data as follows.
    for (const row of rows) {
      const users_email = row.users_login; // Assuming you want to append '@example.com' to users_login to form the users_email.
      const updateSql = 'UPDATE ogp_users SET users_email = ? WHERE users_login = ?';
      connection.query(updateSql, [users_email, row.users_login], (err) => {
        if (err) {
          console.error('Error updating users_email:', err.message);
        }
      });
    }

    console.log('All users_login have been updated to users_email.');
    connection.end((err) => {
      if (err) {
        console.error('Error closing the database connection:', err.message);
      } else {
        console.log('Disconnected from the MySQL database.');
      }
    });
  });
};


updateUsersEmail();
*/
/*
  const query = 'SELECT port FROM ogp_home_ip_ports';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching ports from MySQL:', err);
      return;
    }
    
    // Extract the existing ports from the query results
    const existingPorts = results.map((row) => row.port);
    
    // Create a new port between 27100 and 27180
    let newPort;
    for (let port = 27100; port <= 27180; port++) {
      if (!existingPorts.includes(port)) {
        newPort = port;
        break;
      }
    }
    
    console.log('New available port:', newPort);*/
    
    // Close the MySQL connection
   /* connection.end((err) => {
      if (err) {
        console.error('Error closing MySQL connection:', err);
        return;
      }
      console.log('MySQL connection closed');
    });*/
 // });


/*
let homeid1 = "10"
const query = 'SELECT * FROM ogp_server_homes WHERE home_id = ?';
connection.query(query, [homeid1], (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
  console.log(results[0].control_password);
});
*/


//let newPort = "";

/*connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server');
});
  const query = 'SELECT port FROM ogp_home_ip_ports';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching ports from MySQL:', err);
      return;
    }
    
    const existingPorts = results.map((row) => row.port);
    
   
    for (let port = 27100; port <= 27180; port++) {
      if (!existingPorts.includes(port)) {
        newPort += port;
        break;
      }
    }
  });*/
   
    
    // Close the MySQL connection
    /*connection.end((err) => {
      if (err) {
        console.error('Error closing MySQL connection:', err);
        return;
      }
      console.log('MySQL connection closed');
    });*/
//console.log('New available port:', newPort);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("creategame")
    .setDescription("Create a game server!")
    .addStringOption(option => 
    option.setName('game')
    .setDescription('The game server you want to create!')
    .addChoices(
				{ name: 'MTA:SA', value: 'mta' },
				{ name: 'SA-MP', value: 'samp' },
        { name: 'Minecraft', value: 'minecraft' },
        { name: 'Vice City: Multiplayer', value: 'vcmp' },
				{ name: 'Team Speak 3', value: 'teamspeak3' },
		)
    .setRequired(true))
    .addStringOption(option => 
    option.setName('user')
    .setDescription('Email')
    .setRequired(true))    
    .addStringOption(option => 
      option.setName('password')
      .setDescription('password')
      .setRequired(true))
      .addStringOption(option => 
        option.setName('owner')
        .setDescription('Owner ID')
        .setRequired(true))
    .addStringOption(option => 
    option.setName('server')
    .setDescription('Server Name')
    .setRequired(true))
    .addStringOption(option =>    
    option.setName('slots')
    .setDescription('Server Slots')
    .setRequired(true))
    .addStringOption(option =>    
      option.setName('timestamp')
      .setDescription('Expiration Date dd/mm/YYYY (Ex: 12/04/2028)')
      .setRequired(true)),
    run: async (client, interaction) => {

let gettoken = await dbtoken.get(`token${interaction.member.user.id}`)
let serverid = await dbserverid.get(`serverid${interaction.member.user.id}`)      
if(!gettoken) return await interaction.reply({ content: `:x: - **There is no token registered!**\n Use \`/login\` to create your token.`, ephemeral: true });    
let game = await interaction.options.getString("game");
let game_name;
switch (game) {
  case 'mta':
      game_name = 'MTA:SA';
      break;
  case 'samp':
      game_name = 'SA-MP';
      break;
  case 'minecraft':
      game_name = 'Minecraft';
      break;
  case 'vcmp':
      game_name = 'Vice City: Multiplayer';
      break;
  case 'teamspeak3':
      game_name = 'Team Speak 3';
      break;
  default:
      game_name = 'Unknown Game';
} 
let username = await interaction.options.getString("user")
let password = await interaction.options.getString("password")
let owner = await interaction.options.getString("owner")
let timestamp = await interaction.options.getString("timestamp")
interaction.reply({ content: `Creating...`, ephemeral: true })

if(game == "mta") {
let server_name = await interaction.options.getString("server")
let slots = await interaction.options.getString("slots")
let remote_server_id = config.remote_server_id;    
let home_cfg_id = "146"
let mod_cfg_id = "182"           
const api = await axios.create({baseURL: ip})
//let port = Math.floor(Math.random() * 27500) + 27415;
let cpw = Math.floor(Math.random() * 30000) + 10000;
let cpid = Math.floor(Math.random() * 30000) + 200;
let eftp = "1"   
let affinity = "0"
let nice = "0"  

creatingServer(server_name, slots, remote_server_id, home_cfg_id, mod_cfg_id, api, cpw, cpid, eftp, affinity, nice)
} else if(game == "samp") {
  let server_name = await interaction.options.getString("server")
  let slots = await interaction.options.getString("slots")
  let remote_server_id = config.remote_server_id;    
  let home_cfg_id = "185"
  let mod_cfg_id = "221"           
  const api = await axios.create({baseURL: ip})
  //let port = Math.floor(Math.random() * 27500) + 27415;
  let cpw = Math.floor(Math.random() * 30000) + 10000;
  let cpid = Math.floor(Math.random() * 30000) + 200;
  let eftp = "1"   
  let affinity = "0"
  let nice = "0"  
  
  creatingServer(server_name, slots, remote_server_id, home_cfg_id, mod_cfg_id, api, cpw, cpid, eftp, affinity, nice)

} else if(game == "minecraft") {
  let server_name = await interaction.options.getString("server")
  let slots = await interaction.options.getString("slots")
  let remote_server_id = config.remote_server_id;    
  let home_cfg_id = "133"
  let mod_cfg_id = "151"           
  const api = await axios.create({baseURL: ip})
  //let port = Math.floor(Math.random() * 27500) + 27415;
  let cpw = Math.floor(Math.random() * 30000) + 10000;
  let cpid = Math.floor(Math.random() * 30000) + 200;
  let eftp = "1"   
  let affinity = "0"
  let nice = "0"  
  
  creatingServer(server_name, slots, remote_server_id, home_cfg_id, mod_cfg_id, api, cpw, cpid, eftp, affinity, nice)

}else if(game == "vcmp") {
  let server_name = await interaction.options.getString("server")
  let slots = await interaction.options.getString("slots")
  let remote_server_id = config.remote_server_id;    
  let home_cfg_id = "241"
  let mod_cfg_id = "307"           
  const api = await axios.create({baseURL: ip})
  //let port = Math.floor(Math.random() * 27500) + 27415;
  let cpw = Math.floor(Math.random() * 30000) + 10000;
  let cpid = Math.floor(Math.random() * 30000) + 200;
  let eftp = "1"   
  let affinity = "0"
  let nice = "0"  
  
  creatingServer(server_name, slots, remote_server_id, home_cfg_id, mod_cfg_id, api, cpw, cpid, eftp, affinity, nice)

} else if(game == "teamspeak3") {
  let server_name = await interaction.options.getString("server")
  let slots = await interaction.options.getString("slots")
  let remote_server_id = config.remote_server_id;    
  let home_cfg_id = "209"
  let mod_cfg_id = "245"           
  const api = await axios.create({baseURL: ip})
  //let port = Math.floor(Math.random() * 27500) + 27415;
  let cpw = Math.floor(Math.random() * 30000) + 10000;
  let cpid = Math.floor(Math.random() * 30000) + 200;
  let eftp = "1"   
  let affinity = "0"
  let nice = "0"  
  
  creatingServer(server_name, slots, remote_server_id, home_cfg_id, mod_cfg_id, api, cpw, cpid, eftp, affinity, nice)

}
      
    
 


 async function creatingServer(server_name, slots, remote_server_id, home_cfg_id, mod_cfg_id, api, cpw, cpid, eftp, affinity, nice) {


  const url = `${ip}/ogp_api.php?user_games/list_servers`;
  try {
    const response = await api.post(url, {
      "token": gettoken,
    });
  
    const data = response.data.message;
  
    if (Array.isArray(data)) {
      // Extract existing ports
      /*
      const existingPorts = data.flatMap(server => {
        const ports = [];
  
        if (server.custom_fields) {
          const customFields = JSON.parse(server.custom_fields);
          if (customFields["HTTP Port"]) ports.push(parseInt(customFields["HTTP Port"], 10));
        }
        return ports;
      });
      let newPort;
      await data.forEach(server => {
        if (server.agent_port) {
          // Increment the existing agent_port by 1
          server.agent_port = parseInt(server.agent_port, 10) + 1;
        }
  
        // Create a new port between 27200 and 27900      
        for (let port = 27200; port <= 27900; port++) {
          if (!existingPorts.includes(port)) {
            newPort = port;
            break;
          }
        }
  
        // Add the new port to the server data
        if (newPort) {
          if (!server.custom_fields) {
            server.custom_fields = {};
          } else {
            server.custom_fields = JSON.parse(server.custom_fields);
          }
          server.custom_fields["New HTTP Port"] = newPort;
          existingPorts.push(newPort); // Update existing ports to include the new port
          server.custom_fields = JSON.stringify(server.custom_fields);
        }
      });*/

      let newPort = Math.floor(Math.random() * 27500) + 27415;
  
    
  
  api.post(`/ogp_api.php?user_games/create`, {
      "token": gettoken,
      "remote_server_id": remote_server_id,
      "server_name": server_name,
      "home_cfg_id": home_cfg_id,
      "mod_cfg_id": mod_cfg_id,
      "ip": serverip,
      "port": newPort,
      "control_password": `${data}`,
      "enable_ftp": `${eftp}`,
      "ftp_password": `${cpw}`,
      "slots": slots,
      "affinity": `${affinity}`,
      "nice": `${nice}`
  })
  /*var link = `${ip}/ogp_api.php?user_games%2Fcreate=&token=${gettoken}&remote_server_id=${value3}&server_name=${value1}&home_cfg_id=${value4}&mod_cfg_id=${value5}&ip=${serverip}&port=${port}&control_password=${cpw}&enable_ftp=${eftp}&ftp_password=${cpw}&slots=${value2}&affinity=${affinity}&nice=${nice}`;
  await axios.get(link)
  */
  .then(async (res)  => {
    
  console.log(res.data)
  if(res.data.status == "300") return await interaction.editReply({ content: `:x: - **${res.data.message}**`, ephemeral: true }).then((e) => {
    console.log(`${res.data.message}`)  
     });
  
  if(res.data.message == "Invalid Token") return await interaction.editReply({ content: `:x: - **${res.data.message}, Please login!**`, ephemeral: true }).then((e) => {
    console.log(`${res.data.message}`)  
     });
  
    if(res.data.message == "This function is restricted to administrator accounts.") return await interaction.editReply({ content: `:x: - **${res.data.message}**`, ephemeral: true }).then((e) => {
    console.log(`${res.data.message}`)  
     });
     if(res.data.status == "200") {
    msg = await interaction.editReply({ content: `Adding things...`,
      ephemeral: true, fetchReply: true  })
     .then(async(eaa) => {

    const url = `${ip}/ogp_api.php?gamemanager/update`;
    const data = {
        type: 'rsync',
        token: gettoken,
        game_name: game,
        ip: serverip,
        port: newPort,
    };
    
    const urlEncodedData = querystring.stringify(data);
    
    // Make the POST request
    await axios.post(url, urlEncodedData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });
    
  /*
    let homeId = res.data.message;
  
   const query = 'SELECT * FROM ogp_server_homes WHERE home_id = ?';
   connection.query(query, [homeId], (err, results) => {
     if (err) {
       console.error('Error executing SELECT query:', err);
      // connection.end();
       return;
     }
  
     if (results.length === 0) {
       console.log('No entry found with the provided home_id.');
       interaction.channel.send('No entry found with the provided home_id.')
       return;
     }
  
     const existingControlPassword = results[0].control_password;
     console.log("password", `"${existingControlPassword}"`)
     console.log('Existing control_password:', existingControlPassword);
     let dataw = existingControlPassword.replace(/\s/g, "");
     console.log("password", `"${dataw}"`)
     // Step 2: Update the control_password
     const updateQuery = 'UPDATE ogp_server_homes SET control_password = ? WHERE home_id = ?';
     connection.query(updateQuery, [dataw, homeId], async (err, updateResult) =>  {
       if (err) {
         console.error('Error executing UPDATE query:', err);
       } else {
         console.log('Control password updated successfully.', dataw);
       }
      });
    });
   function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  async function someAsyncFunction() {
    console.log('Start of the function');
  
    // Introduce a 30-second (30000 milliseconds) delay
    await delay(30000);
  
    console.log('End of the function');
  }
  
  // Call the async function
  someAsyncFunction();
  
  */
  
   /*   //let newdb = results[0].control_password
          interaction.channel.send(`Phpmyadmin:\nHost: pma.ares-host.com\nUsername: ${data}\nPassword: ${data}\nDatabase: ${data}`)
          const query = 'SELECT * FROM ogp_server_homes WHERE home_id = ?';
          connection.query(query, [homeId], (err, results) => {
            if (err) {
              console.error('Error executing SELECT query:', err);
              connection.end();
              return;
            }
        
            if (results.length === 0) {
              console.log('No entry found with the provided home_id.');
              connection.end();
              return;
            }
        
            const existingControlPassword = results[0].control_password;
            console.log('Existing control_password:', existingControlPassword);
        console.log(data)
            // Step 2: Update the control_password
            const updateQuery = 'UPDATE ogp_server_homes SET control_password = ? WHERE home_id = ?';
            connection.query(updateQuery, [data, homeId], async (err, updateResult) =>  {
              if (err) {
                console.error('Error executing UPDATE query:', err);
              } else {
                console.log('Control password updated successfully.');
  */
   //await setTimeout(30000);
  const {dateToUNIX} = require('date-str-timestamp')
  let date = `${timestamp}`
  //console.log(dateToUNIX(date))
  
  await api.post(`/ogp_api.php?user_admin/assign`, {
      token: gettoken,
      home_id: `${res.data.message}`,
      email: username,
      access_rights: "ufpetc",
      timestamp: `${dateToUNIX(date)}`
  })
  .then(async (res)  => {
  
    if (res.data.status == 200) {
      console.log(res.data)
  
      /* const query = 'SELECT * FROM ogp_server_homes WHERE home_id = ?';
      connection.query(query, [homeId], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return;
        }
        console.log('Query results:', results);
        console.log(results[0].control_password)
    
      let newdb = results[0].control_password
      */
  
   /*   database.query(`CREATE USER '${newdb}'@'${newdb}' IDENTIFIED BY '${newdb}'`, function (err, result) {
        if (err) throw err;
        console.log("User created", newdb);
      });
     database.query(`CREATE DATABASE ${newdb}`, function (err, result) {
        if (err) throw err;
        console.log("Database created");
        if(result) throw result;
      });
      database.query(`GRANT ALL PRIVILEGES ON \`${newdb}\` . * TO '${newdb}'@'${mysqlip}'`, function (err, result) {
        if (err) throw err;
        console.log("Good");
      })*/
    
    
      
      //console.log(homeId)
      /*
      var sql = `INSERT INTO ogp_mysql_databases (db_id, mysql_server_id, home_id, db_user, db_passwd, db_name, enabled) VALUES ('${cpid}', '1', '${homeId}', 'a${cpw}Res', 'a${cpw}Res', 'a${cpw}Res', '1')`;
      database.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Inserted Successfly");
      });
  
      const conn = mysql.createConnection({
        host: `${mysqlip}`,
        user: `a${cpw}Res`,
        password: `a${cpw}Res`,
        database: `a${cpw}Res`,
        port: 4040
    });
    conn.connect((error) => {
        if (error) throw error;
      console.log("Server Database connected")
    });
  
      //let connection = conn;
      const path = require('path')
      const fs = require('fs')
        if (conn) {
          let queries = fs.readFileSync(path.join(__dirname, '../../owlrp.sql'), { encoding: "UTF-8" }).split(";\n");
          for (let query of queries) {
            query = query.trim();*/
            //if (query.length !== 0 && !query.match(/\/\*/)) {
             
            /*conn.query(query, function (err, sets, fields) {
                if (err) {
                  console.log("Failed Importing Database");
                } else {
                  //console.log(`Importing Mysql Database`);
                }
  
              });
            }
          }
        } else if (!data) {
          console.log(`can't connect to Mysql Database`);
        }
   
   console.log(`Importing Mysql Database: a${cpw}Res`, );
   //eaa.reply({ content: `✅ - **Successfully creating a new ${game} server**\nServer Name: ||${value1}||\nSlots: ||${value2}||\nID:||${res.data.message}||\nMysql Database:\nUser: ||a${cpw}Res||\nPassword: ||a${cpw}Res||\nDatabase: ||a${cpw}Res||`, ephemeral: true })
      //msg.editReply(`Mysql Database:\nUser: a${cpw}Res\nPassword: a${cpw}Res\nDatabase: a${cpw}Res`)*/
   



      await interaction.editReply({ content: `✅ - **Successfully creating a new ${game_name} server**\nServer Name: ${server_name}\nID: ${res.data.message}`,
        ephemeral: true, fetchReply: true  })
    await dbserverid.set(`${username}${server_name}_serverid_${interaction.member.user.id}`, res.data.message)     
    console.log(`${game_name}\nServer Name: ||${server_name}||\nSlots: ${slots}\nID:${res.data.message}`) 
  
    interaction.channel.send(`
      > **${game_name} Server**
      > **-**
      > **Owner : <@${owner}>**
      > **Slots : ${slots}**
      > **-**
      > **Control Panel : https://ogp.tippu.cloud/**
      > **Email : ${username}**
      > **Password : ${password}**
      > -
      > **Server expiration date: ${timestamp}**
      `)
      const guild1 = client.guilds.cache.get('1183672027320696832');
      const channel1 = guild1.channels.cache.get('1194177167806976101');
      if(channel1) channel1.send(`
      > **${game_name} Server**
      > **-**
      > **Owner : <@${owner}>**
      > **Slots : ${slots}**
      > **-**
      > **Control Panel : https://ogp.tippu.cloud/**
      > **Email : ${username}**
      > **Password : ${password}**
      > -
      > **Server expiration date: ${timestamp}**
      `) 





  }
    })
    .catch(async error => {
    console.log("aaaaaaa", error)
    interaction.editReply({ content: `:x: - **Wrong informations**`, ephemeral: true }); 
    
    
  
  
  })
  .catch(async error => {
    console.log(error)
    //interaction.reply({ content: `:x: - **Wrong informations**`, ephemeral: true }); 
  
  
  })
  await api.post(`/ogp_api.php?user_games/set_expiration`, {
    token: gettoken,
    home_id: `${res.data.message}`,
    timestamp: `${dateToUNIX(date)}`
  })
       
     });//EE
     return;
    }
   //if(res.data.includes("Duplicate entry")) return await interaction.reply({ content: `:x: - **Failed to create game, Server port already in use.**`, ephemeral: true }).then((e) => {console.log(`Failed to create account, name or username already in use.`) });  
  await interaction.editReply({ content: `:x: - **Error, there is no space left for creating the server**`, ephemeral: true }).then((e) => {
    console.log(e) 
     });  
  })
  .catch(async error => {
       console.log(error)
       interaction.editReply({ content: `:x: - **Wrong informations**`, ephemeral: true }); 
  })
  } else {
    console.error('Unexpected data format:', data);
  }
  
  } catch (error) {
    console.error('Error fetching or modifying data:', error);
  }
  

 }

}
};