import { connection } from "./connection.js";

connection().then(async () => {
    const args = process.argv;

    const fakerFile = args[2];
    const limit = args[3];
    const faker = await import(`./${fakerFile}`);
    faker.run(limit);
});
