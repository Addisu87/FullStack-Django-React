import { faker } from "@faker-js/faker";
import commentFixtures from "../../../helpers/fixtures/comment";
import postFixtures from "../../../helpers/fixtures/post";
import userFixtures from "../../../helpers/fixtures/user";
import { render, screen } from "../../../helpers/test-utils";
import UpdateComment from "../UpdateComment";

const userData = userFixtures();
const postData = postFixtures(true, false, userData);
const commentData = commentFixtures(true, false, userData, postData);

test("Render UpdateComment component", async () => {
  const { user } = render(<UpdateComment comment={commentData} />);

  // Get by elements
  const updateFormElement = screen.getByTestId("update-comment-form");
  expect(updateFormElement).toBeInTheDocument();

  const commentBodyField = screen.getByTestId("comment-body-field");
  expect(commentBodyField).toBeInTheDocument();

  const submitCommentButton = screen.getByTestId("update-comment-submit");
  expect(submitCommentButton).toBeInTheDocument();

  const commentBody = faker.lorem.sentence(10);
  await user.type(commentBodyField, commentBody);

  // Checking if field has the text and button is not disabled
  expect(commentBodyField.value).toBe(commentData.body + commentBody);
  expect(submitCommentButton).not.toBeDisabled();
});
