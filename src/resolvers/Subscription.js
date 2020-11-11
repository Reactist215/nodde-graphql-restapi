const newLinkSubScribe = (paren, args, context, info) => {
    return context.pubsub.asyncIterator("New Link");
}

const newLink = {
    subscribe: newLinkSubScribe,
    resolve: payload => {
        return payload
    },
};

const newVoteSubscribe = (parent, args, context, info) => {
    return context.pubsub.asyncIterator("New Vote");
}

const newVote = {
    subscribe: newVoteSubscribe,
    resolve: payload => {
        return payload
    }
}

module.exports = {
    newLink,
    newVote,
}
