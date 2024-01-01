const cron = require('node-cron');
const { channelId, starOwner } = require('../../config.json')

function startCronJobs(client) {
  startOfDayNotification(client);
}

function startOfDayNotification(client) {
  const startOfDay = '0 9 * * *'
  cron.schedule(startOfDay, () => {
    let channel = client.channels.cache.get(channelId);
    if (channel) {
      channel.send(`<@${starOwner}> Don't forget to set your task for the day :3`);
    } else {
      console.error('Start of Day notification failed; Channel not found.');
    }
  });
}

module.exports = {
  startCronJobs
}