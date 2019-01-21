const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middlware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use('/graphql',
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  }));

mongoose
  .connect(`mongodb+srv://mikepike:${process.env.MONGO_PASSWORD}@cluster0-ccqgu.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, {useNewUrlParser: true})
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err)
  });

