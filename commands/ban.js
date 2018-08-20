const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("You need more info! Make sure to do !ban <name> <reason>");
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You do not have permission.");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That user can't be banned!");


  let banEmbed = new Discord.RichEmbed()
  .setDescription("Ban")
  .setColor("#c60101")
  .addField("Offender", `${bUser} with ID: ${bUser.id}`)
  .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", bReason);

  let incidentchannel = message.guild.channels.find(`name`, "ban-database");
  if (!incidentchannel) return message.channel.send("Can't find incidents channel");


message.guild.member(bUser).ban(bReason);
incidentchannel.send(banEmbed);


  return;
 }

 module.exports.help = {
   name: "ban"
 }
