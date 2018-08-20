const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


if(!message.member.roles.find('name', 'Owner') || !message.member.roles.find('name', 'Owner'))  return message.reply("Sorry, you don't have permission to!")
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("You didn't enter anyone's name.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("I couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return message.reply("He/She already has that role.");
  await(rMember.addRole(gRole.id));
  let serverembed = new Discord.RichEmbed()
  .setDescription("Promotion")
  .setColor("#42f47d")
  .addField("Promoted!", `${rMember.user.username} has been promoted! :smiley:`)
  return message.channel.send(serverembed);
  try{
    await rMember.send(`Woohoo, you have been promoted to ${gRole.name}!`)
  }catch(e){

    message.channel.send(`Success! <@${rMember.id}>, has been promoted to ${gRole.name}!`)
  }
}

module.exports.help = {
  name: "promote"
}
