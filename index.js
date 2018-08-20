const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} loaded`);
  bot.commands.set(props.help.name, props);
  });

});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("on play.valencemc.us", {type: "PLAYING"});
});

bot.on("message", async message => {
  if(message.author.bot) return;
if(message.channel.type === "dm") return;
let prefix = botconfig.prefix;
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args = messageArray.slice(1);
  let igt = args.slice(0).join(' ');
  let mentee_role = message.guild.roles.find("name", "test");
  let IGTChannel = message.guild.channels.find(`name`, "in-game-times");
let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  if(cmd === `${prefix}amibad`){
    return message.channel.send("If you're BestPD, yes.");
  }
  if(cmd === `!submit`){
      if(message.member.roles.find('name','Mentee')) {
        let no_IGT = new Discord.RichEmbed()
        .setTitle("IGT - Error")
        .setColor("#FF0000")
        .addField("Format", "!submit <IGT>")
        .addField("What Went Wrong?", "You didn't specify an in-game time!")
        if(!igt) return message.channel.send(no_IGT);
        let correct_IGT = new Discord.RichEmbed()
        .setTitle("IGT")
        .setColor("#228B22")
        .setDescription("Successfully submitted your IGT!")
        message.channel.send(correct_IGT);
        let IGT_final = new Discord.RichEmbed()
        .setTitle("Current IGT - " + message.author.username + "#" + message.author.discriminator)
        .setColor("#00FFFF")
        .addField("IGT", igt)
        IGTChannel.send(IGT_final);
      } else {
        let no_perms = new Discord.RichEmbed()
        .setTitle("IGT - Error")
        .setColor("#FF0000")
        .addField("Format", "!submit <IGT>")
        .addField("What Went Wrong?", "You don't have permission to use this command!")
        return message.channel.send(no_perms)
    }
    };
});



// if(cmd === `${prefix}kick`){
//
// let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
// if(!kUser) return message.channel.send("You need more info! Make sure to do !kick <name> <reason>");
// let kReason = args.join(" ").slice(22);
// if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission.");
// if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That user can't be kicked!");
//
//
// let kickEmbed = new Discord.RichEmbed()
// .setDescription("Kick")
// .setColor("#ff3232")
// .addField("Offender", `${kUser} with ID: ${kUser.id}`)
// .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
// .addField("Kicked In", message.channel)
// .addField("Time", message.createdAt)
// .addField("Reason", kReason);
//
// let kickChannel = message.guild.channels.find(`name`, "incidents");
// if (!kickChannel) return message.channel.send("Can't find channel");
//
// message.guild.member(kUser).kick(kReason);
// kickChannel.send(kickEmbed);
//
// return;
// }
//
//
//
//
//   let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//   if(!bUser) return message.channel.send("You need more info! Make sure to do !ban <name> <reason>");
//   let bReason = args.join(" ").slice(22);
//   if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You do not have permission.");
//   if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That user can't be banned!");
//
//
//   let banEmbed = new Discord.RichEmbed()
//   .setDescription("Ban")
//   .setColor("#c60101")
//   .addField("Offender", `${bUser} with ID: ${bUser.id}`)
//   .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
//   .addField("Banned In", message.channel)
//   .addField("Time", message.createdAt)
//   .addField("Reason", bReason);
//
//   let incidentchannel = message.guild.channels.find(`name`, "incidents");
//   if (!incidentchannel) return message.channel.send("Can't find incidents channel");
//
//
// message.guild.member(bUser).ban(bReason);
// incidentchannel.send(banEmbed);
//
//
//   return;
//  }





// if(cmd === `${prefix}report`){
//
//
// let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
// if(!rUser) return message.channel.send("We need more info! Make sure to do !report <name> <reason>");
// let reason = args.join(" ").slice(22);
// if (!reason && rUser) {
//   message.channel.send("We need more info! Make sure to do !report <name> <reason>");
//   return;
// };
//
//
// let reportEmbed = new Discord.RichEmbed()
// .setDescription("_Reports_")
// .setColor("#c60101")
// .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
// .addField("Reported By",  `${message.author} with ID: ${message.author.id}`)
// .addField("Location of Incident", message.channel)
// .addField("Time of Incident", message.createdAt)
// .addField("Reason for Report", reason);
//
// let reportschannel = message.guild.channels.find(`name`, "reports");
// if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
//
// message.delete().catch(O_o=>{});
// reportschannel.send(reportEmbed);
//
// message.channel.send(reportEmbed);
//
//   return;
// }
//
//
// if(cmd === `${prefix}about`){
//
// let serverembed = new Discord.RichEmbed()
// .setDescription("About")
// .setColor("#990014")
// .addField("Who is the mentor? Who are/is the mentor assistant(s)?", "Best is the mentor, (name) is the assistant.")
// .addField("How can I submit my IGT?", "You can submit your In Game Time by doing !submit (IGT). It will then be passed onto Best and assistants!")
// .addField("How can I see a full list of commands?", "Do !commands for more information.")
//
//
// return message.channel.send(serverembed);
//
// return;
// }
//
//  if(cmd === `${prefix}rhinfo`){
//
//    let botembed = new Discord.RichEmbed()
//    .setDescription("Information about the Bot")
//    .setColor("#51ff99")
//    .addField("Bot Name", bot.user.username)
//    .addField("Created By", "@Best")
//
//
//
//
//    return message.channel.send(botembed);
// }
//

bot.login(botconfig.token);
