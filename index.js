// const dotenv = require('dotenv').config({path: __dirname + '/.env'})
const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');
const models = require('./server/models/createModels')
const seedDb = require('./server/seedDb')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = "keystone-fun";

const keystone = new Keystone({
  name: PROJECT_NAME,
  secureCookies: false,
  adapter: new Adapter({
    mongoUri: 'mongodb://localhost:27017/valkryie-keystonejs'
  }),
  onConnect: seedDb,
  sessionStore: new MongoStore({
    url: 'mongodb://localhost:27017/valkryie-keystonejs'
  })
});

models.createLists(keystone)

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: '/public', src: './public' }),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
