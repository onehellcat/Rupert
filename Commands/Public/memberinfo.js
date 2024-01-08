const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { profileImage } = require('discord-arts');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("memberinfo")
        .setDescription("View a member's information. Leave empty to view your own")
        .setDMPermission(false)
        .addUserOption((option) => option
            .setName("member")
            .setDescription("View a member's information. Leave empty to view your own")
        ),

        async execute(interaction){
            await interaction.deferReply()
            const member = interaction.options.getMember("member") || interaction.member;

            if(member.user.bot) return interaction.editReply({
                embeds:
                [
                        new EmbedBuilder().setDescription("Bots are not supported")
                ],
                ephemeral: true
            });

            try{
                const fetchedMembers = await interaction.guild.members.fetch();

                const profileBuffer = await profileImage(member.id);
                const imageAttachment = new AttachmentBuilder(profileBuffer, {name: 'profile.png'});
                
                const joinPosition = Array.from(fetchedMembers
                    .sort((a,b) => a.joinedTimestamp - b.joinedTimestamp)
                    .keys())
                    .indexOf(member.id)+1;

                    const topRoles = member.roles.cache
                    .sort((a, b) => b.position - a.position)
                    .map(role => role);

                    const userBadges = member.user.flags.toArray()

                    const joinTime = parseInt(member.joinedTimestamp / 1000);
                    const createdTime = parseInt(member.user.createdTimestamp / 1000);

                    const Booster = member.premiumSince ? "<:discordboost7:1193494569644470323> " : "Not Booster";
                   
                    const Embed = new EmbedBuilder()
                        .setAuthor({name: `${member.user.tag} | General Information`, iconURL: member.displayAvatarURL() })
                        .setColor(member.displayColor)
                        .setDescription(`On <t:${joinTime}:D>, ${member.user.username} joined as the **${addSuffix(joinPosition)}** member of this guild. `)
                            /**
                            * * all timestamp flags:
                            * * t: Short time
                            * * T: Long time
                            * * d: Short Date
                            * * D: Long Date
                            * * f: ( default ) Short date / time
                            * * F: long date / time
                            * * R: relative time
                            */
                        .setImage("attachment://profile.png")
                        .addFields([
                            {name: "Badges",     value: `${addBadges(userBadges).join("")}`, inline: true},
                            {name: "Booster",    value: `${Booster}`, inline: true},
                            {name: "Top Roles",  value: `${topRoles.join("")}`, inline: false},
                            {name: "Created",    value: `<t:${createdTime}:R>`, inline: true},
                            {name: "Joined",     value: `<t:${joinTime}:R>`, inline: true},
                            {name: "Identifier", value: `${member.id}`, inline: false},
                            {name: "Avatar",     value: `[Link](${member.displayAvatarURL()})`, inline: true},
                            {name: "Banner",     value: `[Link](${(await member.user.fetch()).bannerURL()})`, inline: true},
                            /** 
                             * FIXME: Banner fetch not working
                             * ! Responds with " [Link](null) "
                            */

                        ]);

                        interaction.editReply({embeds: [Embed], files: [imageAttachment]});


            } catch (error){
                interaction.editReply({content: "An error occured: Contact the Developer"});
                throw error;
            }
        }
    }       



function addSuffix(number){
    if(number % 100 >= 11 && number %  100 <= 13 )
        return number + "th";

        switch(number % 10){
            case 1: return number + "st";
            case 2: return number + "nd";
            case 3: return number + "rd";
        }
        return number + "th";
    
}


function addBadges(badgeNames) {
    if(!badgeNames.length) return ["X"];
    const badgeMap = {
        "ActiveDeveloper": "<:activedeveloper:1193494567442460762>",
        "BugHunterLevel1": "<:discordbughunter1:1193494572597268531> ",
        "BugHunterLevel2": "<:discordbughunter2:1193494574702805032> ",
        "PremiumEarlySupporter": "<:discordearlysupporter:1193494576015626271> ",
        "Partner": "<:discordpartner:1193494800738025492> ",
        "Staff": "<:discordstaff:1193494584630722681> ",
        "HypeSquadOnlineHouse1": "<:hypesquadbravery:1193494588594339890> ", // bravery
        "HypeSquadOnlineHouse2": "<:hypesquadbrilliance:1193494906174459915> ", // brilliance
        "HypeSquadOnlineHouse3": "<:hypesquadbalance:1193494587273134111> ", // balance
        "Hypesquad": "<:hypesquadevents:1193494597331079208>",
        "CertifiedModerator": "<:discordmod:1193494578523811860> ",
        "VerifiedDeveloper": "<:discordbotdev:1193494571146018886>",
    };
  
    return badgeNames.map(badgeName => badgeMap[badgeName] || '❔');
}