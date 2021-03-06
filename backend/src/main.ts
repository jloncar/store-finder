import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

// Configuration properties
const port = 5000;
const graphiql = true;
globalThis.routingServerPrefix = 'https://routing.openstreetmap.de/routed-car/route/v1/driving/';
globalThis.maximumRoutingRequests = 5;

// Bootstrap
const app = express();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use('/graphql', graphqlHTTP({ schema, rootValue: resolvers, graphiql }));

console.log(`Listening on http://localhost:${port}/`);
app.listen(port);
