/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

const { EmbedBuilder, ChannelType, SlashCommandBuilder, Client, ClientApplication, ClientUser, UserFlags, User, Options, UserFlagsBitField, userMention } = require("discord.js");
const axios = require('axios').default;
const { client_id } = require("./config.json");
const client = require("./bot")
/**
 * @type {import('./typings').SlashInteractionCommand}
 */
module.exports = {

    data: new SlashCommandBuilder()
      .setName("lookupAxios")
      .setDescription(
        "Uses a roblox username to get their profile details."
      )
      .addStringOption((option) =>
        option
          .setName("username")
          .setDescription("The user you wish to lookup.")
          .setRequired(true),
      ),
    
    async execute(interaction) {
      /**
       * @type {string}
       * @description The "Username"argument
       */
      //ADD TRYCATCH LATER FOR IF :"username" IS NULL
      const queriedUsername = interaction.options.getString("username");
      //add username history info part
      const axios = require('axios');
      let robloxUsernameToIdApiCallResponse = await axios.post(
        'https://users.roblox.com/v1/usernames/users',
        // '{\n  "usernames": [\n    "TheDestinyGamez"\n  ],\n  "excludeBannedUsers": true\n}',
        {
          'usernames': [
            `${queriedUsername}`
          ],
          'excludeBannedUsers': false
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      //robloxUsernameToIdApiCallResponse.status
      //robloxUsernameToIdApiCallResponse.data.data[0].id
      //robloxUsernameToIdApiCallResponse.data.data[0].name
      //robloxUsernameToIdApiCallResponse.data.data[0].displayName
      //robloxUsernameToIdApiCallResponse.statusText
      //interaction.member.user.discriminator
      //interaction.member.user.id
      //interaction.member.user.username
      //interaction.member.user.defaultAvatarURL
      //interaction.member.roles.member.user.avatar
      //2b0832195f55f3edfefca50dc9f8adc4
      //robloxUsernameToIdApiCallResponse.data.data.length

      if (robloxUsernameToIdApiCallResponse.data.data.length == 0) {
        const userDoesNotExistEmbed = new EmbedBuilder()
          .setColor(`Yellow`)
          .setTitle(`Roblox User Not Found`)
          .setURL()
      } else {
        
      }

      const triggerUserAvatarUrl = `https://cdn.discordapp.com/avatars/`+interaction.member.id+`/`+interaction.user.avatar

      const userInfoEmbed = new EmbedBuilder()
        .setColor('Random')
        .setTitle()//username
        .setURL()//profile link
        .setAuthor({name: `${}`, url: , iconURL:triggerUserAvatarUrl  })//user's discord name then roblox profile link, along with the discord avatar
        .setDescription(`${}'s Roblox information.`)//roblox profile description
        .setThumbnail()//roblox profile pic
        .addFields(
          { name: `Username`, value: `${}` },//active roblox username
          { name: `${}`, value: `${}`},//previous usernames
          { name: `${}`, value: `${}`},//users roblox bio
          { name: `Account Age (in days for now)`, value: `${}`},//account age
          { name: `Account Creation Date`, value: `${}`},//join date
          { name: `Banned From Roblox?`, value: `${}`} //add logic to state that the user is or isnt based on a boolean with the word returned from the api call.
        )
        .addFields(
          //facebook
          { name: `${}`, value: `${}`, inline: true},//facebook social link
          { name: `${}`, value: `${}`, inline: true},//twitter social link
          { name: `${}`, value: `${}`, inline: true},//youtube social link
          { name: `${}`, value: `${}`, inline: true},//twitch social link
          { name: `${}`, value: `${}`, inline: true}//guilded social link
        )
        .setTimestamp()
        .setFooter({ text: `Thankyou for using RBX Tourney!`, iconURL: `https://images-ext-2.discordapp.net/external/rw2Imvrf2VRuUT5khhD0imRwr2bRcsL4gw8xH_Lz3NM/%3Fsize%3D512/https/cdn.discordapp.com/avatars/1087785796196634776/5d6dfc7c7b79dfbf3fee2d3334b95db3.png?width=320&height=320`});//footer
      
        interaction.reply({
          embeds: [userInfoEmbed],  
    });
  },
};