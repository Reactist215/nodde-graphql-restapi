const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require('@prisma/client');

const resolvers = {
    Query: {
        info: () => 'Info is string',
        feed: () => links,
        link: (id) => {
            return links.find(item => item.id === id)
        }
    },
    Mutation: {
        post: (parent, arg) => {
            const link = {
                description: arg.description,
                url: arg.url
            };

            links.push(link);

            return link;
        },

        update: (parent, arg) => {

        }
    },
    Link: {
        id: (parent) => parent.id + 1,
        description: (parent) => parent.description,
        url: (parent) => parent.url
    }
};

const prisma = new PrismaClient();
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        prisma
    }
});

server.start(() => console.log(`Server is listening at port 4000`));
