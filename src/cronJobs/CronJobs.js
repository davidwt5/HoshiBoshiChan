const cron = require('node-cron');
const { channelId, starOwner, starManager } = require('../../config.json');
const { readFromDb, writeToDb } = require('../utils/DbUtils');

function startCronJobs(client) {
  console.log(new Date());
  startOfDayNotification(client);
  endOfDayNotification(client);
}

// The timezone that is being used is 9 hours behind Melbourne. Therefore we push it ahead 9 hours.
function startOfDayNotification(client) {
  const startOfDay = '0 22 * * *' // 9AM AEDT - 11 hours time difference
  cron.schedule(startOfDay, () => {
    let channel = client.channels.cache.get(channelId);
    sendMessage(channel, `<@${starOwner}> Don't forget to set your task for the day :3`)
  });
}

function endOfDayNotification(client) {
  const endOfDay = '0 17 * * *' // 4AM - 11 hours time difference
  cron.schedule(endOfDay, async () => {
    let channel = client.channels.cache.get(channelId);

    // Read task of day
    let task = await readFromDb("taskOfTheDay");

    // If task of day not empty then notifiy me and stephy saying task is not completed and close task
    if (task.length !== 0) {
      sendMessage(channel, `<@${starOwner}> <@${starManager}> Seems like the task might have been lapsed D:`)
      await writeToDb("taskOfTheDay", "");
    }
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
