module.exports = {
	name: 'ping',
	decription: 'ping command',
	execute(msg,args){
		msg.channel.send('Pong!');
	},
};