const { SlashCommandBuilder } = require('discord.js');
const { readFromDb } = require('../../utils/DbUtils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check-task-of-the-day')
		.setDescription('Checks the task of the day'),
	async execute(interaction) {
    const taskOfTheDay = await readFromDb("taskOfTheDay");
		if (!taskOfTheDay) {
			await interaction.reply(`You haven't set any tasks for today :clown:`);
		} else {
			await interaction.reply(`Your task today is "${taskOfTheDay}" :cowboy:`);
		}
	},
};
