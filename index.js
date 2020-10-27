const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
type Query{
    info: String!
}
`;

const resolvers = {
    Query: {
        info: () => `This is the API of GraphQL`
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log(`Server is listening at port 4000`));
