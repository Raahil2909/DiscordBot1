const Discord = require('discord.js');
var url = 'https://codeforces.com/api/user.info?handles=';
// const Discord = require('discord.js');
var getJSON = require('get-json');

// getJSON(url,function(err,res){
// 	console.log('Err ->',err);
// 	console.log(res);
// })

module.exports = {
	name: 'cf',
	decription: 'codeforces commands',
	execute(msg,args){
		if(args[0] === 'handle'){
			finalurl = url+args[1];
			getJSON(finalurl,function(err,res){
				// if(err) return msg.channel.send('Errr...');
				// return msg.channel.send(res);
				if(err){
					return msg.channel.send('Handle not found! :(');
				}
				else{
					// console.log(res);
					var name = res.result[0].firstName+' '+res.result[0].lastName;
					var highestRating = res.result[0].maxRating;
					var currentRating = res.result[0].rating;
					var maxrank = res.result[0].maxRank;
					var rank = res.result[0].rank;
					var colors = ['#dcdcdc','#00d500','#00a7af','#0000a6','#4e005a','#e37100','#c90000'];
					var color ='';
					if(currentRating<1200){
						color = colors[0];
					} else if(currentRating<1400){
						color = colors[1];
					} else if(currentRating<1600){
						color = colors[2];
					} else if(currentRating<1900){
						color = colors[3];
					} else if(currentRating<2200){
						color = colors[4];
					} else if(currentRating<2400){
						color = colors[5];
					} else{
						color = colors[6];
					}
					pic_url = 'https:'+res.result[0].avatar;
					console.log(color);
					console.log(pic_url);
					const embed = new Discord.MessageEmbed()
					.setColor(color)
					.setTitle(name)
					.addFields(
						{name:"Current Rating", value : currentRating},
						{name:"Max Rating", value : highestRating},
						{name:"Current Rank", value : rank},
						{name:"Max Rank", value : maxrank},
					)
					.setThumbnail(pic_url);
					console.log('Request made for : ',name);
					return msg.channel.send(embed);
					
				}
			});
		}
	},
};