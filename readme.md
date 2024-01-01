# Instructions
## Build Mode
- Run ```docker-compose up -d```

## Dev Mode
- Run init.sh
- Inside ./config.json, configure the following properties:
```json
{
	"token": "bot_token",
	"clientId": "bot_client_id",
	"guildId": "server_id",
	"channelId": "channel_id",
	"starManager": "id_of_star_manager",
	"starOwner": "id_of_star_owner"
}
```
- Deploy the slash commands by running 
```javascript
npm run deployCommands
```
- Start the bot by running:
```javascript
npm run start
```


