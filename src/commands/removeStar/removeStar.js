const { SlashCommandBuilder } = require('discord.js');
const { starManager } = require('../../../config.json');
const { readFromDb, writeToDb } = require('../../utils/DbUtils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removestar')
		.setDescription('Removes a star'),
	async execute(interaction) {
    if (interaction.user.username !== starManager) {
      await interaction.reply('This command is only for StarManagers and you are not one!!!!! D:<');
    }
    else {
      await removeStar();
      await interaction.reply('Removed a star.. bye bye star :(');
    }
	},
};

async function removeStar() {
  const starsCount = await readFromDb("stars");
  let newStarsCount = (Number(starsCount)-1).toString();
  writeToDb("stars", newStarsCount);
}
