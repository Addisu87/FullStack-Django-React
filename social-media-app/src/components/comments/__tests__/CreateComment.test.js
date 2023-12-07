import { faker } from "@faker-js/faker";
import { cleanup, render, screen } from "../../../helpers/test-utils";
import CreateComment from "../CreateComment";

// Clean up after each test
afterEach(() => {
  cleanup();
});

test("render CreateComment component", async () => {
  // Get the "user" object from the render function
  const { user } = render(<CreateComment />);

  //Clicking to show modal
  const showCommentModalForm = screen.getByTestId("comment-modal-form");
  expect(showCommentModalForm).toBeInTheDocument();
  user.click(showCommentModalForm);

  // Get form elements
  const createFormElement = screen.getByTestId("create-comment-form");
  expect(createFormElement).toBeInTheDocument();

  const commentBodyField = screen.getByTestId("comment-body-field");
  expect(commentBodyField).toBeInTheDocument();

  const submitButton = screen.getByTestId("create-comment-submit");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();

  const commentBody = faker.lorem.sentence(10);
  await user.type(commentBodyField, commentBody);

  // Checking if field has the text and button is not disabled
  expect(commentBodyField.value).toBe(commentBody);
  expect(submitButton).not.toBeDisabled();
});
