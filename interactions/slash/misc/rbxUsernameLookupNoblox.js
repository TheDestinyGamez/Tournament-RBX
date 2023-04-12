/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

const { EmbedBuilder, ChannelType, SlashCommandBuilder, Client, ClientApplication, ClientUser, UserFlags, User, Options, UserFlagsBitField, userMention } = require("discord.js");
const noblox = require("noblox.js");
const { client_id } = require("../../../config.json");
const client = require("../../../bot")
/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {

    data: new SlashCommandBuilder()
      .setName("robloxlookupno")
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
      const activeUsername = queriedUsername // UPDATE TO USERHISTORY VALIDATION LATER
      const userId = await noblox.getIdFromUsername([`${queriedUsername}`]);
      let profileLinkRoblox = `https://www.roblox.com/users/`+`${userId}`+`/profile`

      //checking to see if the user exists
      let doesUserExistOnRoblox = userId ?? 1
      console.log(doesUserExistOnRoblox)
      if (doesUserExistOnRoblox == 1) {
        interaction.reply(`The roblox username, "${queriedUsername}" you have requested information on does not exist, maybe check your spelling of it?`)
        console.log(`THIS IS NOT A BOT ERROR, THIS IS A USER INPUT ERROR, IGNORE`)
        return
      } else {
        console.log(`Username exists, grabbing data now`)
      }
      let userSocialLinks = await noblox.getUserSocialLinks(userId);
      const thumbnail_CircleHeadshot = await noblox.getPlayerThumbnail(`${userId}`, 420, `png`, true, `Headshot`).then(result => { return result[0].imageUrl });
      const playerRobloxData = await noblox.getPlayerInfo(userId)
      const userRobloxHeahshotFinal = thumbnail_CircleHeadshot

      //logic for bio

      let isBioNull = playerRobloxData.blurb ?? 1
      let queriedUserBio = playerRobloxData.blurb
      if (isBioNull == 1) {
        console.log(`❌${queriedUsername}'s bio is not set, program should continue as usual`)
      } else {
        console.log(`✅ ${queriedUsername} has a bio, continuing as usual`)
      }
      if (isBioNull == 1) {
        var bioName = `Roblox Profile Description`
        var bioValue = `The user's profile description is either filtered by roblox or is not set.`
      } else {
        var bioName = `Roblox Profile Description`
        var bioValue = `${queriedUserBio}`
      }

      
      //logic for username history
      
      let isUsernameHistoryNull = playerRobloxData.oldNames ?? 1
      let previousUsernames = playerRobloxData.oldNames
      if (isUsernameHistoryNull == 1) {
        console.log(`❌${queriedUsername} does not have any past usernames on record, program should continue as usual`)
      } else {
        console.log(`✅ ${queriedUsername} has a username history, continuing as usual`)
      }
      console.log(isUsernameHistoryNull)
      console.log(previousUsernames in playerRobloxData)
      if (previousUsernames in playerRobloxData) {
        if (isUsernameHistoryNull == 1) {
          var usernameHistoryName = `Username History`
          var usernameHistoryValue = `The user has never altered their account's username.`
        } else {
          var usernameHistoryName = `Username History`
          var usernameHistoryValue = `${previousUsernames}`
        }
      } else {
        var usernameHistoryName= `Username History`
        var usernameHistoryValue = `The user has never altered their accounts username.`
      }
      
      //logic for social media link sorting using null coalsecing

      //removed for now
      
      let socialLinks = userSocialLinks
      //logic for social media link sorting using null coalsecing

      let isFacebookNull = socialLinks.facebook ?? 1
      console.log(isFacebookNull)
      if (isFacebookNull == 1) {
        var facebookSocialMediaLinkName = `\u200b`
        var facebookSocialMediaLinkValue = `\u200b`
      } else {
        var facebookSocialMediaLinkName = `Facebook`
        var facebookSocialMediaLinkValue = `${userSocialLinks.facebook}`
      }

      let isTwitterNull = socialLinks.twitter ?? 1
      console.log(isTwitterNull)
      if (isTwitterNull == 1) {
        var twitterSocialMediaLinkName = `\u200b`
        var twitterSocialMediaLinkValue = `\u200b`
      } else {
        var twitterSocialMediaLinkName = `Twitter`
        var twitterSocialMediaLinkValue = `${userSocialLinks.twitter}`
      }

      let isYoutubeNull = socialLinks.youtube ?? 1
      console.log(isYoutubeNull)
      if (isYoutubeNull == 1) {
        var youtubeSocialMediaLinkName = `\u200b`
        var youtubeSocialMediaLinkValue = `\u200b`
      } else {
        var youtubeSocialMediaLinkName = `Youtube`
        var youtubeSocialMediaLinkValue = `${userSocialLinks.youtube}`
      }

      let isTwitchNull = socialLinks.twitch ?? 1
      console.log(isTwitchNull)
      if (isTwitchNull == 1) {
        var twitchSocialMediaLinkName = `\u200b`
        var twitchSocialMediaLinkValue = `\u200b`
      } else {
        var twitchSocialMediaLinkName = `Twitch`
        var twitchSocialMediaLinkValue = `${userSocialLinks.twitch}`
      }

      let isGuildedNull = socialLinks.guilded ?? 1
      console.log(isGuildedNull)
      if (isGuildedNull == 1) {
        var guildedSocialMediaLinkName = `\u200b`
        var guildedSocialMediaLinkValue = `\u200b`
      } else {
        var guildedSocialMediaLinkName = `Guilded`
        var guildedSocialMediaLinkValue = `${userSocialLinks.guilded}`
      }

      let userAvatarUrlGet = interaction.member.displayAvatarURL()
      const triggerUserAvatar = userAvatarUrlGet
      //to add a blank field, use ".addFields({ name: '\u200b', value: '\u200b' })"
      const userInfoEmbed = new EmbedBuilder()
        .setColor('Random')
        .setTitle(activeUsername)
        .setURL(profileLinkRoblox)
        .setAuthor({name: `${interaction.user.username}`, url: profileLinkRoblox, iconURL: triggerUserAvatar })
        .setDescription(`${activeUsername}'s Roblox information.`)
        .setThumbnail(userRobloxHeahshotFinal)
        .addFields(
          { name: `Username`, value: `${playerRobloxData.username}` },
          { name: `${usernameHistoryName}`, value: `${usernameHistoryValue}`},
          { name: `${bioName}`, value: `${bioValue}`},
          { name: `Account Age (in days for now)`, value: `${playerRobloxData.age}`},
          { name: `Account Creation Date`, value: `${playerRobloxData.joinDate}`},
          { name: `Banned From Roblox?`, value: `${playerRobloxData.isBanned}`} //add logic to state that the user is or isnt based on a boolean with the word returned from the api call.
        )
        .addFields(
          //facebook
          { name: `${facebookSocialMediaLinkName}`, value: `${facebookSocialMediaLinkValue}`, inline: true},
          { name: `${twitterSocialMediaLinkName}`, value: `${twitterSocialMediaLinkValue}`, inline: true},
          { name: `${youtubeSocialMediaLinkName}`, value: `${youtubeSocialMediaLinkValue}`, inline: true},
          { name: `${twitchSocialMediaLinkName}`, value: `${twitchSocialMediaLinkValue}`, inline: true},
          { name: `${guildedSocialMediaLinkName}`, value: `${guildedSocialMediaLinkValue}`, inline: true}
        )
        .setTimestamp()
        .setFooter({ text: `Thankyou for using RBX Tourney!`, iconURL: `https://images-ext-2.discordapp.net/external/rw2Imvrf2VRuUT5khhD0imRwr2bRcsL4gw8xH_Lz3NM/%3Fsize%3D512/https/cdn.discordapp.com/avatars/1087785796196634776/5d6dfc7c7b79dfbf3fee2d3334b95db3.png?width=320&height=320`});
      
        interaction.reply({
          embeds: [userInfoEmbed],  
    });
  },
};