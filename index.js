const { GraphQLServer, PubSub } = require("graphql-yoga");
const { PrismaClient } = require('@prisma/client');
const Query = require('./src/resolvers/Query');
const Mutation = require('./src/resolvers/Mutation');
const Link = require('./src/resolvers/Link');
const User = require('./src/resolvers/User');
const Subscription = require('./src/resolvers/Subscription');
const Vote = require('./src/resolvers/Vote');

const resolvers = {
    Query,
    Mutation,
    Link,
    User,
    Subscription,
    Vote,
};

const prisma = new PrismaClient();
const pubsub = new PubSub();
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            pubsub,
            prisma,
        }
    },
});

server.start(() => console.log(`Server is listening at port 4000`));
