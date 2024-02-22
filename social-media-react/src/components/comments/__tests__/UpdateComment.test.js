import { faker } from "@faker-js/faker";
import { v4 as uuid4 } from "uuid";
import userEvent from "@testing-library/user-event";

import commentFixtures from "../../../helpers/fixtures/comment";
import userFixtures from "../../../helpers/fixtures/user";
import { fireEvent, render, screen } from "../../../helpers/test-utils";
import UpdateComment from "../UpdateComment";

const userData = userFixtures();
const commentData = commentFixtures(true, false, userData);

test("Render UpdateComment component", async () => {
  const user = userEvent.setup();
  render(<UpdateComment postId={uuid4()} comment={commentData} />);

  const showModalForm = screen.getByTestId("show-modal-form");
  expect(showModalForm).toBeInTheDocument();

  // Clicking to show the modal
  fireEvent.click(showModalForm);

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
