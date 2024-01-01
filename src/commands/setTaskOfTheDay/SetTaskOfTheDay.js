const { SlashCommandBuilder } = require('discord.js');
const { writeToDb } = require('../../utils/DbUtils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-task-of-the-day')
		.setDescription('Set your task for the day')
    .addStringOption(option =>
      option.setName('task')
        .setDescription('The input to echo back')
        .setRequired(true)),
	async execute(interaction) {
    const task = interaction.options.getString("task");
    await writeToDb("taskOfTheDay", task);
    await interaction.reply(`Your task of "${task}" has been set!`);
	}
};
