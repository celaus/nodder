
import restify = require('restify');
import restify_clients = require('restify-clients')
import builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector, (session, args) => {
        var client = restify_clients.createJsonClient('https://nodfn.azurewebsites.net/');        
        client.get('api/NrOfTheDayGenerator', (e,rq,rs,obj) => {
            session.send(`Today, the number is ${obj.number}. Thank you for using my services.`);
        });
    });
server.post('/api/messages', connector.listen());