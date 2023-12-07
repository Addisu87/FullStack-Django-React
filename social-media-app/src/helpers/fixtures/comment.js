import { v4 as uuid4 } from "uuid";
import { faker } from "@faker-js/faker";
import userFixtures from "./user";
import postFixtures from "./post";

const commentFixtures = (
  isLiked = true,
  isEdited = false,
  user = undefined,
  post = undefined
) => {
  return {
    id: uuid4(),
    author: user || userFixtures(),
    post: post || postFixtures(),
    body: faker.lorem.sentence(20),
    edited: isEdited,
    liked: isLiked,
    likes_count: Math.floor(Math.random() * 10),
    created: faker.date.recent(),
    updated: faker.date.recent(),
  };
};
export default commentFixtures;
