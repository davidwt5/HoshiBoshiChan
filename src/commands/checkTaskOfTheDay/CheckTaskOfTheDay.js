const { SlashCommandBuilder } = require('discord.js');
const { readFromDb } = require('../../utils/DbUtils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check-task-of-the-day')
		.setDescription('Checks the task of the day'),
	async execute(interaction) {
    const taskOfTheDay = await readFromDb("taskOfTheDay");
    await interaction.reply(`Your task today is "${taskOfTheDay}" :cowboy:`);
	},
};
