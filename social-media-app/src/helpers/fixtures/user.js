import { faker } from "@faker-js/faker";
import { v4 as uuid4 } from "uuid";

const userFixtures = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: uuid4(),
    first_name: firstName,
    last_name: lastName,
    name: firstName + " " + lastName,
    username: firstName + lastName,
    posts_count: Math.floor(Math.random() * 10),
    email: `${firstName}@gmail.com`,
    bio: faker.lorem.sentence(20),
    avatar: faker.image.avatar(),
    updated: faker.date.recent(),
    created: faker.date.recent(),
  };
};

export default userFixtures;
