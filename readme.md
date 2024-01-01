# Instructions
- Run init.sh
- inside config.json, configure the following properties:
```json
{
	"token": "bot_token",
	"clientId": "bot_client_id",
	"guildId": "server_id",
	"starManager": "username_of_star_manager",
	"starOwner": "username_of_star_owner"
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
