//literally just takes a publish and subscribe to get from 
//server to client, but this allows us to explicitly decide
//what gets pushed to client. Just making sure you're only
//sending the data you want the client to have access to! (That's actually done
//with the 'publish' call on the server side
//subscriptions in the client are where we specify what data we want
//Cool! Meteor has Mongo on server and minimongo on client that
//allows everything to look like it's instant!
