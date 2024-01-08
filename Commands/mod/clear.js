const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputInteraction} = require("discord.js");
const Transcripts = require("discord-html-transcripts");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Delete messages")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .addNumberOption(options => options
        .setName("amount")
        .setDescription("The amount of messages you want to delete")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
        )
        .addStringOption(options => options
            .setName("reason")
            .setDescription("Reason why you delete the message(s)")
            .setRequired(false)  // ? Set true if you want reason required 
           
            )
            .addUserOption(options => options
                .setName("target")
                .setDescription("User who's messages you want to delete")
                .setRequired(false) // ? Not Needed tbh
           
                
                ),
                async execute(interaction) {
                    const Amount = interaction.options.getNumber("amount");
                    const Reason = interaction.options.getString("reason");
                    const Target = interaction.options.getUser("target");

                    const channelMessages = await interaction.channel.messages.fetch();
                    const logChannel = interaction.guild.channels.cache.get("551799955581435927");
                    
                    
                    const responseEmbed = new EmbedBuilder().setColor("Blurple");
                    const logEmbed = new EmbedBuilder().setColor('DarkAqua')
                        .setAuthor({name:"CLEARED"});


                        let logEmbedDescription = [
                            `• Moderator: ${interaction.member}`,
                            `• Target: ${Target || "None"}`,
                            `• Channel: ${interaction.channel}`,
                            `• Reason: ${Reason}`
                        ];
                            if(Target){
                                let i = 0;
                                let messagesToDelete = [];
                                channelMessages.filter((message) => {
                                    if(message.author.id === Target.id && Amount > i){
                                        messagesToDelete.push(message);
                                        i++;
                                    }
                                });
                                    const Transcript = await Transcripts.generateFromMessages(messagesToDelete, interaction.channel);

                                    interaction.channel.bulkDelete(messagesToDelete, true).then((messages) => { 
                                    interaction.reply({
                                        embeds: [responseEmbed.setDescription(`🧹 Cleared \` ${messages.size}\`  messages from ${target}` )], 
                                            ephemeral: true
                                }); 

                                    logEmbedDescription.push( `• Total Messages: ${messages.size}`)
                                    logChannel.send({
                                        embeds: [logEmbed.setDescription(logEmbedDescription.join("\n"))],
                                            files: [Transcript]
                                });
                                });
                                
                            } else{
                                const Transcript = await Transcripts.createTranscript(interaction.channel,  { limit: Amount});
                                    interaction.channel.bulkDelete(Amount, true).then((messages)=>{
                                        interaction.reply({
                                            embeds: [responseEmbed.setDescription(`🧹 Cleared \` ${messages.size}\`  messages` )], 
                                                ephemeral: true
                                    }); 
                                    logEmbedDescription.push( `• Total Messages: ${messages.size}`)
                                    logChannel.send({
                                        embeds: [logEmbed.setDescription(logEmbedDescription.join("\n"))],
                                            files: [Transcript]
                                        });

                                    })
                            }

                            
                }
}

 