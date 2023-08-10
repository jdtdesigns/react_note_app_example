require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { authenticate } = require('./auth');

const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./db/connection');

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3333;
const is_prod = process.env.PORT;

const { typeDefs, resolvers } = require('./schema');



async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();


  // Load middleware
  if (is_prod) {
    app.use(express.static(path.join(__dirname, '../browser/build')));
  }

  app.use(express.json());
  // Add additional cookie tools to the route request object
  app.use(cookieParser());
  app.use(cors());
  app.use(expressMiddleware(server, {
    context: authenticate,
  }));

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
}

// Ensure the db connection is open and start the express server
db.once('open', async () => {
  // start express
  await startServer();

  console.log('Server started on port %s', PORT);
  console.log('GraphQL ready at /graphql');
});