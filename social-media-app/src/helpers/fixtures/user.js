import React from "react";
import { faker } from "@faker-js/faker";
import { v4 as uuid4 } from "uuid";

const userFixtures = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return (
    <>
      {{
        id: uuid4(),
        first_name: firstName,
        last_name: lastName,
        name: firstName + " " + lastName,
        username: firstName + lastName,
        posts_count: Math.floor(Math.random() * 10),
        email: `${firstName}@gmail.com`,
        bio: faker.lorem.sentence(20),
        avatar: null,
        updated: faker.date.recent(),
        created: faker.data.recent(),
      }}
    </>
  );
};

export default userFixtures;
