const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
/**
 * 
 * !━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ! For some reason the role list is limited to 10 options. Counts from top to bottom
 * ! 
 * ! 
 * !━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

    
module.exports = {
    data: new SlashCommandBuilder() 
      .setName('giverole')
      .setDescription('Allows you to give a role to someone .')
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // * Administrator only command 
      .setDMPermission(false)
      .addUserOption(option =>
        option.setName('user')
          .setDescription('The user to give the role to.')
          .setRequired(true))
      .addRoleOption(option =>
        option.setName('role')
          .setDescription('The role to give to the user.')
          .setRequired(true)),

    async execute(interaction) {
      const guild = interaction.guild;
      const member = guild.members.cache.get(interaction.options.getUser('user').id);
      const role = interaction.options.getRole('role');
  
      try {
        await member.roles.add(role);
        await interaction.reply(`The role ${role.name} has been added to ${member.user.username}.`);
      } catch (error) {
        console.error(error);
        await interaction.reply('There was an error giving the role.');
      }
    },
  };