const { InteractionType } = require("discord.js");

 module.exports = {
	name: 'interactionCreate',
	execute: async(interaction) => {
         let client = interaction.client;
   	 if (interaction.type == InteractionType.ApplicationCommand) {
   	 if(interaction.user.bot) return;
	try {
         const command = client.commands.get(interaction.commandName)
         command.run(client, interaction)
	} catch {
	interaction.reply({content: "A problem was encountered while running the command! Please try again.\nIf it still not working, contact me on Discord: n1cho. or on [Github](https://github.com/notN1CHO/Discord-OGP/) ", ephemeral: true})
	}
	 }
  }}
