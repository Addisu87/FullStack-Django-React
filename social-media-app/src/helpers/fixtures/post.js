import React from "react";
import { v4 as uuid4 } from "uuid";
import { faker } from "@faker-js/faker";
import userFixtures from "./user";

const postFixtures = (isLiked = true, isEdited = false, user = undefined) => {
  return (
    <div>
      {{
        id: uuid4,
        author: user || userFixtures(),
        body: faker.lorem.sentence(20),
      }}
    </div>
  );
};

export default postFixtures;
