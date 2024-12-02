import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { context } from './context';
import { schema } from './schema';

export const server = new ApolloServer({
  schema,
  context,
  introspection: true, // Allow introspection for development and debugging
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  cors: {
    origin: '*',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
});

const port = process.env.PORT || 5000;

server
  .listen({ port })
  .then(({ url }) => {
    console.log(`🟢 Server is running at ${url}`);
  })
  .catch((err) => {
    console.error(`🔴 Server failed to start:`, err);
    process.exit(1);
  });
