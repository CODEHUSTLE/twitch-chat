const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const tmi = require('tmi.js');
require('dotenv').config();

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL_NAME],
};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// A messages service that allows to create new
// and return all existing messages
class MessageService {
  constructor() {
    this.messages = [];
  }

  async find() {
    // Just return all our messages
    return this.messages;
  }

  async create(data) {
    // The new message is the data merged with a unique identifier
    // using the messages length since it changes whenever we add one
    console.log(data);
    const message = {
      id: uuidv4(),
      user: data.user,
      text: data.text,
    };

    // Add new message to the list
    if (this.messages.length >= 10) {
      this.messages.pop(0);
    } else {
      this.messages.push(message);
    }

    return message;
  }
}

// Creates an ExpressJS compatible Feathers application
const app = express(feathers());
// Enable CORS
app.use(cors());
// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Host static files from the current folder
app.use(express.static(__dirname));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
// Register an in-memory messages service
app.use('/messages', new MessageService());
// Register a nicer error handler than the default Express one
app.use(express.errorHandler());

// Add any new real-time connection to the `everybody` channel
app.on('connection', (connection) => app.channel('everybody').join(connection));
// Publish all events to the `everybody` channel
app.publish((data) => app.channel('everybody'));

// Start the server
app
  .listen(3030)
  .on('listening', () =>
    console.log('Feathers server listening on localhost:3030')
  );

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

// For good measure let's create a message
// So our API doesn't look so empty
function onMessageHandler(target, context, msg, self) {
  //console.log({ target, context, msg, self });
  app.service('messages').create({
    user: context.username,
    text: msg,
  });
}
