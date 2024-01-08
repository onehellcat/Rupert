const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {ChatInputCommandInteraction} Interaction
     * 
     */
    execute(interaction, client){
        if(!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if(!command)
        return interaction.reply({
            content: "This is an outdated command",
            ephemeral: true
        }); 
        
        if(command.developer && interaction.user.id !== "282948723234045953")
         interaction.reply({
            content:"This is command is for the developer only!",
            ephemeral: true
        });
       
        command.execute(interaction, client);
    }
}




//282948723234045953