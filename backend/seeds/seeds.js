const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker'); // Make sure to destructure faker

const prisma = new PrismaClient();

const userData = () => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    password: faker.internet.password(), // Consider hashing this before seeding
    role: faker.helpers.arrayElement(['ADMIN', 'USER'])
});

const taskData = (userId) => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    creationDate: faker.date.past(),
    status: faker.helpers.arrayElement(['TO_DO', 'IN_PROGRESS', 'DONE']),
    userId: userId
});

const createUsersWithTasks = async () => {
    const users = [];

    // Generate 10 users
    for (let i = 0; i < 10; i++) {
        const user = await prisma.user.create({
            data: {
                ...userData(),
                password: await prisma.user.hashPassword(userData().password), // Ensure you have a hashing function
            }
        });
        users.push(user);
    }

    // Generate 5 tasks for each user
    for (const user of users) {
        for (let i = 0; i < 5; i++) {
            await prisma.task.create({
                data: taskData(user.id)
            });
        }
    }
};

createUsersWithTasks()
    .then(() => {
        console.log('Successfully inserted fake data into database');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error inserting fake data into database:', error);
        process.exit(1);
    });
