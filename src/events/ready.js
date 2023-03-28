const { ActivityType } = require("discord.js")
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
  client.user.setActivity({ name: `Made By N1CHO#6559`, type: ActivityType.Listening });
}};
