import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

// ENV CONFIG
const port = 5000;
const graphiql = true;

const app = express();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use('/graphql', graphqlHTTP({ schema, rootValue: resolvers, graphiql }));

console.log(`Listening on http://localhost:${port}/`);
app.listen(port);
