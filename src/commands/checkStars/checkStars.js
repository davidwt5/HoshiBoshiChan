const { SlashCommandBuilder } = require('discord.js');
const { readFromDb } = require('../../utils/DbUtils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('checkstars')
		.setDescription('Checks your star balance'),
	async execute(interaction) {
    const starsCount = await readFromDb("stars");
    await interaction.reply(`Your star balance is at ${starsCount} stars :sunglasses:`);
	},
};
