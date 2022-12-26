/* eslint-disable no-unused-vars */
// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits, ActivityType, CommandInteractionOptionResolver } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./.config.json');
const aceutils = require("./.aceutil");

// Create a new client instance
const client = new Client(
    {
        intents: [ GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.Guilds],
		loadMessageCommandListeners: true,
    },
);


client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
	try{
		client.commands.set(command.ctx.name, command);
	} catch(err){
	}
}

// When the client is ready, run this code (only once)
client.once('ready', async () => {
	client.user.setStatus('online');
    client.user.setActivity("<h1>Online</h1>");
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!(interaction.isChatInputCommand() || interaction.isStringSelectMenu())) return;

	
	if(interaction.isChatInputCommand()){
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		//Set name
		let speakers_name = interaction.member.nickname;
		if (speakers_name == null) {
			speakers_name = interaction.member.user.username;
		}

		try {
			const commandObj = await command.execute(interaction);
            const ver = await aceutils.verify(client,interaction, commandObj);
            console.log(`Verify: ${ver}`)
		} catch (error) {
			console.error(error);
			try {await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true})} catch(e){console.log("Fucked up")}
		}
	}
    else if (interaction.isStringSelectMenu()){
        console.log(interaction);
        const select = interaction.client.commands.get(interaction.message.interaction.commandName);

		//if (!select) return;

		//Set name
		let speakers_name = interaction.member.nickname;
		if (speakers_name == null) {
			speakers_name = interaction.member.user.username;
		}

		try {
			const commandObj = await select.select(interaction);
            const ver = await aceutils.verify(client, interaction, commandObj);
            console.log(`Verify: ${ver}`)
		} catch (error) {
			console.error(error);
			try {await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true})} catch(e){console.log("Fucked up")}
		}
    }
		
});



// Login to Discord with your client's token
client.login(token);