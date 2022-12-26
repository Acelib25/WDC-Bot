/* eslint-disable no-unused-vars */
const { SlashCommandBuilder, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const wait = require('node:timers/promises').setTimeout;
const packageInfo = require('../package.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Info!'),
	async execute(interaction) {
        const infoEmbed = {
            color: 0x39a9d7,
            title: `Info`,
            url: "https://www.dsu.edu/",
            image: {
                url: interaction.client.user.displayAvatarURL({ dynamic: true, size: 256 * 2}),
            },
            fields: [
                { name: 'Bot Name', value: `${interaction.client.user.username}`, inline: true},
                { name: 'Creator', value: "Bryston#6231", inline: true},
                { name: 'Version', value: `${packageInfo.version}`, inline: true},
                { name: 'DJS Version', value: "v14 (Latest)", inline: true},
                { name: 'Description', value: `${packageInfo.description}`},
                { name: 'Guild', value:  `${interaction.guild.name}(${interaction.guild.id})`},
                { name: 'Channel', value:  `${interaction.channel.name}(${interaction.channel.id})`},

            ],
            timestamp: new Date().toISOString(),
        }
        interaction.reply({ embeds: [infoEmbed] })
        return { message: "[Embed]", args: { none: "none" } }
	},
};