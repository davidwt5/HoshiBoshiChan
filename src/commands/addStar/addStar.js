const { SlashCommandBuilder } = require('discord.js');
const { starManager } = require('../../../config.json');
const fs = require('fs');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addstar')
		.setDescription('Adds a star'),
	async execute(interaction) {
    if (interaction.user.username !== starManager) {
      await interaction.reply('This command is only for StarManagers and you are not one!!!!! D:<');
    }
    else {
      // write into file for stars :3
      incrementStars();
      await interaction.reply('Added a star!');
    }
	},
};

function incrementStars() {
  const filePath = path.resolve(__dirname, '../../../db', 'stars');
  fs.readFile(filePath, 'utf8', (err, starsCount) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    // Print the content of the file
    console.log('File content:', starsCount);
    let newStarsCount = (Number(starsCount)+1).toString();

    fs.writeFile(filePath, newStarsCount, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return;
      }
      console.log('Content has been written to the file successfully.');
    });

  });

}