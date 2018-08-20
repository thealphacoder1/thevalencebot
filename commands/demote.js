const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.roles.find('name', 'Owner') || !message.member.roles.find('name', 'Owner'))  return message.reply("Sorry, you don't have permission to!")
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("You didn't enter anyone's name.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("I couldn't find that role.");

  if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
  await(rMember.removeRole(gRole.id));
  let serverembed = new Discord.RichEmbed()
  .setDescription("Demotion")
  .setColor("#c40000")
  .addField("Aw!", `${rMember.user.username} has been demoted from their current rank.`)
  return message.channel.send(serverembed);

  try{
    await rMember.send(`Aww, you lost the ${gRole.name} role.`)
  }catch(e){
    message.channel.send(`Rip, <@${rMember.id}> has been demoted from their current rank.`)
  }
}

module.exports.help = {
  name: "demote"
}
