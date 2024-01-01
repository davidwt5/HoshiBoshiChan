const { SlashCommandBuilder } = require('discord.js');
const { starManager, starOwner } = require('../../../config.json');
const { readFromDb, writeToDb } = require('../../utils/DbUtils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addstar')
		.setDescription('Adds a star'),
	async execute(interaction) {
    if (interaction.user.id !== starManager) {
      await interaction.reply('This command is only for StarManagers and you are not one!!!!! D:<');
    }
    else {
      let starsCount = await addStar();
      await interaction.reply(`<@${starOwner}>  Good job on completing the task! I gib u star, you're now at ${starsCount} stars! Yipee :D`);
      await writeToDb("taskOfTheDay", "");
    }
	},
};

async function addStar() {
  const starsCount = await readFromDb("stars");
  let newStarsCount = (Number(starsCount)+1).toString();
  await writeToDb("stars", newStarsCount);
  return newStarsCount;
}
