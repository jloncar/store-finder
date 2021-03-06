import { buildSchema } from 'graphql';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const schemaFiles = ['schema.gql'];

export default buildSchema(
  schemaFiles
    .map((schemaFile) => readFileSync(resolve(__dirname, schemaFile)).toString('utf-8'))
    .join('\n\n'),
);
