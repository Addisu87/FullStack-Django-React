import { faker } from "@faker-js/faker";
import { v4 as uuid4 } from "uuid";
import { cleanup, render, screen } from "../../../helpers/test-utils";
import CreateComment from "../CreateComment";
import { setAuthTokens } from "../../../redux/authSlice";
import userFixtures from "../../../helpers/fixtures/user";

const userData = userFixtures();

// Clean up after each test
beforeEach(() => {
  // Cleans up the DOM after each test
  cleanup();
  // to fully reset the state between __tests__, clear the storage
  localStorage.clear();
  // and reset all mocks
  jest.clearAllMocks();

  setAuthTokens({
    user: userData,
    access: null,
    refresh: null,
  });
});

test("Render CreateComment component", async () => {
  // Get the "user" object from the render function
  const { user } = render(<CreateComment postId={uuid4()} />);

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
