/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

const { EmbedBuilder, ChannelType, SlashCommandBuilder } = require("discord.js");
const noblox = require("noblox.js")

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {

    data: new SlashCommandBuilder()
      .setName("lookup")
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
      let queriedUsername = interaction.options.getString("username");
      return queriedUsername == null ? 0 : (queriedUsername[1] || 0);
      let id = await noblox.getIdFromUsername([`${queriedUserame}`])
      let profileLink = `https://www.roblox.com/users/`+`${id}`+`/profile`
      let 

    },
};