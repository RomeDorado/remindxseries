'use strict';
const config = require('./config');
// create an API server
const Restify = require('restify');
const server = Restify.createServer({
	name: 'remindO'
});//
const PORT = process.env.PORT || 3000;

// FBeamer
const FBeamer = require('./fbeamer');
const f = new FBeamer(config.FB);

server.use(Restify.jsonp());
server.use(Restify.bodyParser());
server.use((req, res, next) => f.verifySignature(req, res, next));

// Agenda
const agenda = require('./agenda')(f);
// Session
const session = require('./session');
// WIT Actions
const actions = require('./actions')(session, f, agenda);

const inq = require('./actions/inquiry')


//OMDB
const omdb = require('./omdb');
const inquire = require('./actions/inquiry');
const createResponse = require('./person')


// WIT.AI
const Wit = require('node-wit').Wit;
const wit = new Wit({
	accessToken: config.WIT_ACCESS_TOKEN,
	actions
});

// Register the webhooks
server.get('/', (req, res, next) => {
	f.registerHook(req, res);
	return next();
});



agenda.on('ready', () => {
	// Handle incoming
	server.post('/', (req, res, next) => {
		f.incoming(req, res, msg => {
			const {
				sender,
				postback,
				message
			} = msg;

			if(postback && !postback.payload.includes("menu")) {
					const {
						schedule,
						fbid,
						id
					} = JSON.parse(postback.payload);

					agenda.now(schedule, {
						fbid,
						id
					});
			}

			if((message && message.text) || (postback && postback.payload.includes("menu"))) {

				//WIT Message API
				 wit.message(message.text, {})
				.then(omdb)
				.then(response => {					
					f.txt(sender, response.text);
					if(response.image) {
						f.img(sender, response.image);
					}else
					if (response.jsonfile){
						//console.log(JSON.stringify(response.jsonfile));
						f.card(sender, response.jsonfile)

					}
				})
				.catch(error => f.txt(sender, error));

				// Process the message here
				let sessionId = session.init(sender);
				let {context} = session.get(sessionId);
				let messageTxt = postback ? postback.payload.split(":")[1] : message.text;
				// Run WIT Actions (Converse API)
				wit.runActions(sessionId, messageTxt, context)
					.then(ctx => {
						// Delete session if the conversation is over
						ctx.jobDone ? session.delete(sessionId) : session.update(sessionId, ctx);
					})

					.catch(error => console.log(error))
					.then(omdb)
					.then(response => {		(console.log(response));
						//f.txt(sender, response.text);
						if(response.image) {
							f.img(sender, response.image);
						}
					})
					.catch(error => console.log(error + "this is the error"))



			}

		});

		return next();
	});

	agenda.start();
});

// Persistent Menu
f.showPersistent([
	{
		type: "postback",
		title: "My Reminders",
		payload: "menu:Show my reminders"
	}
]);

// Subscribe
f.subscribe();

server.listen(PORT, () => console.log(`Bot running on port ${PORT}`));
