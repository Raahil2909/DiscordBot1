const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
require('dotenv').config();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const {prefix} = require('./config.json');
const token = process.env.TOKEN;

client.once('ready', () => {
      console.log('Bot is online!');
});

client.login(token);

for(const file of commandFiles){
      const command = require(`./commands/${file}`);
      client.commands.set(command.name,command);
}


client.on('message', msg =>{
      if(!msg.content.startsWith(prefix)||msg.author.bot) return;

      const args = msg.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      if(!client.commands.has(commandName)) return;
      const command = client.commands.get(commandName);

      if(!args.length){
            const attachment = new Discord.MessageAttachment('b.jpg');
            const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('ERROR')
            .setDescription('not enough arguments.')
            .setFooter('Bot Error Log')
            .addField('Code','000x9',true)
            .addFields(
                  { name:"name1",value:"value1",inline: true},
                  { name:"name2",value:"value2",inline:true},
            )
            .attachFiles(attachment)
            .setThumbnail('attachment://b.jpg')
            .setImage('attachment://b.jpg');
            return msg.channel.send(embed);
      }

      try{
            command.execute(msg,args);
      } catch(error){
            console.error(error);
            msg.reply(`Err... Can't execute the command! `);
      }

});

