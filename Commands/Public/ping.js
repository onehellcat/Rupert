const { ChatInputCommandInteraction, SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Get a respond"),
     /**
     *
     * @param {ChatInputCommandInteraction} interactin 
     * 
     */
    
    execute(interactin){
        interactin.reply({content: "Pong!.", ephemeral: true});

    }
}