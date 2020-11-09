const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const newlinks = await prisma.link.create({
        data: {
            description: 'Full Stack tutorial for GraphQl',
            url: "www.reactist215.com"
        }
    })
    const alllinks = await prisma.link.findMany();

    console.log(alllinks);
}

main()
    .catch(e  => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })