const { ActivityType } = require("discord.js")
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
  client.user.setActivity({ name: `Made by N1CHO`, type: ActivityType.Watching });
}};
