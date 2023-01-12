import { faker } from '@faker-js/faker';

const createProject = () =>  { 
    const _id = faker.datatype.uuid();
    const title = faker.name.jobTitle();
    const description = faker.commerce.productDescription();
    const creationDate = faker.date.recent();
    const ownerId = faker.datatype.uuid();

    return {_id, title, description, creationDate, ownerId}
}

const createUser = () => { 
    const name = faker.name.firstName();
    const username = faker.internet.userName(); 
    const password = faker.internet.password();
    const _id = faker.datatype.uuid();
    const creationDate = faker.date.recent();
}

module.exports = {
    createProject,
    createUser
}