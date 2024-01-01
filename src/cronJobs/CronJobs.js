const cron = require('node-cron');
const { channelId, starOwner, starManager } = require('../../config.json');
const { readFromDb, writeToDb } = require('../utils/DbUtils');

function startCronJobs(client) {
  startOfDayNotification(client);
  endOfDayNotification(client);
}

function startOfDayNotification(client) {
  const startOfDay = '0 9 * * *'
  cron.schedule(startOfDay, () => {
    let channel = client.channels.cache.get(channelId);
    sendMessage(channel, `<@${starOwner}> Don't forget to set your task for the day :3`)
  });
}

function endOfDayNotification(client) {
  const endOfDay = '0 4 * * *'
  cron.schedule(endOfDay, async () => {
    let channel = client.channels.cache.get(channelId);

    // Read task of day
    let task = await readFromDb("taskOfTheDay");

    // If task of day not empty then notifiy me and stephy saying task is not completed
    if(task.length === 0) {
      sendMessage(channel, `<@${starOwner}> <@${starManager}> Seems like the task might have been lapsed D:`)
    }

    // Delete the task
    await writeToDb("taskOfTheDay", "");
  });
}

function sendMessage(channel, message) {
  if (channel) {
    channel.send(message);
  } else {
    console.error('Start of Day notification failed; Channel not found.');
  }
}

module.exports = {
  startCronJobs
}