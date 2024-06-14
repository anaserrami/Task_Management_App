const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function testConnection() {
    try {
        await prisma.$connect();
        console.log('Connection successful');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();

const userData = () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: 'USER'
});

const adminData = {
    name: "Admin User",
    email: "admin@gmail.com",
    phone: "123-456-7890",
    role: "ADMIN"
};

const taskData = (userId) => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    creationDate: faker.date.past(),
    status: faker.helpers.arrayElement(['TO_DO', 'IN_PROGRESS', 'DONE']),
    userId
});

const createUsersWithTasks = async () => {
    try {
        const users = [];

        // Create admin user
        const hashedAdminPassword = await hashPassword("admin");
        const adminUser = await prisma.user.create({
            data: {
                ...adminData,
                password: hashedAdminPassword
            }
        });
        users.push(adminUser);

        console.log(`Admin created with email: ${adminUser.email} and password: 'admin'`);

        // Generate 9 more users
        for (let i = 0; i < 9; i++) {
            const plainPassword = faker.internet.password();
            const hashedPassword = await hashPassword(plainPassword);
            const user = await prisma.user.create({
                data: {
                    ...userData(),
                    password: hashedPassword
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

        console.log('Successfully inserted fake data into database');
    } catch (error) {
        console.error('Error inserting fake data into database:', error);
    } finally {
        await prisma.$disconnect();
        process.exit(0);
    }
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

createUsersWithTasks();
