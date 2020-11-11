const postedBy = (parent, args, context) => {
    return context.prisma.link.findOne({ where: { id: parent.id } }).postedBy();
}

const votes = (parent, args, context) => {
    return context.prisma.vote.findOne({ where: { id: parent.id }}).votes();
}

module.exports = {
    postedBy,
    votes,
}
