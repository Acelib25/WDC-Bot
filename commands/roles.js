/* eslint-disable no-unused-vars */
const { SlashCommandBuilder, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const wait = require('node:timers/promises').setTimeout;
const packageInfo = require('../package.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Roles.'),
	async execute(interaction) {
        const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
                    .setMaxValues(5)
					.addOptions([
						{
							label: 'Remove Roles',
							description: 'Select if you want to remove these roles',
							value: 'REMOVE',
						},
                        {
							label: 'Student',
							description: 'For DSU Students',
							value: '1055740858869239809',
						},
						{
							label: 'Faculty',
							description: 'For DSU Faculty',
							value: '1055741108988149760',
						},
                        {
							label: 'Meeting Alerts',
							description: 'Get pinged about meetings',
							value: '1055978104792813579',
						},
                        {
							label: 'New Tutorial Alerts',
							description: 'Get pinged about new tutorials',
							value: '1055978165291462726',
						},
					]),
			);

		await interaction.reply({ content: 'Pick your roles.', components: [row], ephemeral: true });
        return { message: "Role Picker", args: { none: "none" } }
	},
    async select(interaction){
        if (interaction.values.includes("REMOVE")){
            let values = interaction.values;
            const member = interaction.member;
            for (role in values) {
                if (values[role] == "REMOVE"){}
                else if (member.roles.cache.some(roles => roles.id == values[role])) {
                    try {
                        console.log(role);
                        role = interaction.member.roles.cache.find(roles => roles.id == values[role]);
                        console.log(role);
                        member.roles.remove(role);
                    }
                    catch (e){
                        console.log("Missing role")
                    }
                }
                else {
                    console.log("Missing role to remove.")
                }
            }
            interaction.reply({ content: 'Removed roles.',  ephemeral: true });
            return { 
                message: "Removed roles.", 
                args: { roles: values.map(element => {
                    if (element == "REMOVE"){ return "Remove"}
                    else {
                        return interaction.guild.roles.cache.find(roles => roles.id == element).name;
                    }
                    })
                } 
            }
        }
        else {
            let values = interaction.values;
            const member = interaction.member;
            for (role in values) {
                try {
                    console.log(role);
                    role = interaction.guild.roles.cache.find(roles => roles.id == values[role]);
                    console.log(role);
                    member.roles.add(role);
                }
                catch (e){
                    console.log("Error adding role")
                }
            }
            interaction.reply({ content: 'Added roles.',  ephemeral: true });
            return { 
                message: "Added roles.", 
                args: { roles: values.map(element => {
                    if (element == "REMOVE"){ return "Remove"}
                    else {
                        return interaction.guild.roles.cache.find(roles => roles.id == element).name;
                    }
                    })
                } 
            }
        }
    }
};