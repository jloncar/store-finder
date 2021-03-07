import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { StoreSchema } from './graphql/StoreSchema';

// Configuration properties
const port = 5000;
const graphiql = true;
globalThis.routingServerHost = 'https://routing.openstreetmap.de/';
globalThis.maximumRoutingRequests = 5;

// Bootstrap
const app = express();

app.use('/graphql', graphqlHTTP({ schema: StoreSchema, graphiql })); // eslint-disable-line @typescript-eslint/no-misused-promises

console.log(`Listening on http://localhost:${port}/`);
app.listen(port);
