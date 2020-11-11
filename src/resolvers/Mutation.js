const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('./../utils');

const signup = async (parent, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.prisma.user.create({data: {...args, password}});

    const token = jwt.sign({userId: user.id}, APP_SECRET);

    return {
        token,
        user,
    }
}

const login = async (parent, args, context, info) => {
    const user = await context.prisma.user.findOne({where: {email: args.email}})

    if (!user) {
        throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error('Invalid Password');
    }

    const token = jwt.sign({userId: user.id}, APP_SECRET);

    return {
        token,
        user,
    }
}

const post = async (parent, args, context, info) => {
    const userId = getUserId(context);

    const newLink = context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: {id: userId }}
        }
    })
    context.pubsub.publish("New Link", newLink);

    return newLink;
}

const vote = async (parent, args, context, info) => {
    const userId = getUserId(context);

    const vote = await context.prisma.vote.findOne({
        where: {
            linkId_userId: {
                linkId: Number(args.linkId),
                userId: userId
            }
        }
    });

    if (Boolean(vote)) {
        throw new Error(`Already voted for links: ${args.linkId}`);
    }

    const newVote = context.prisma.vote.create({
        data: {
            user: { connect: { id: userId } },
            link: { connect: { id: Number(args.linkId) } },
        }
    })

    context.pubsub.publish("New Vote", newVote);
}

module.exports = {
    signup,
    login,
    post,
    vote,
}