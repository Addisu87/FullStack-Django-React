import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

import { cleanup, render, screen } from "../../../helpers/test-utils";
import CreatePost from "../CreatePost";

// Clean up after each test
afterEach(() => {
  cleanup();
});

test("Render CreatePost component", async () => {
  // Get the "user" object from the render function
  const user = userEvent.setup();
  render(<CreatePost />);

  //Clicking to show modal
  const showModalForm = screen.getByTestId("show-modal-form");
  expect(showModalForm).toBeInTheDocument();
  user.click(showModalForm);

  // Get form elements
  const createFormElement = screen.getByTestId("create-post-form");
  expect(createFormElement).toBeInTheDocument();

  const postBodyField = screen.getByTestId("post-body-field");
  expect(postBodyField).toBeInTheDocument();

  const submitButton = screen.getByTestId("create-post-submit");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();

  const postBody = faker.lorem.sentence(10);
  await user.type(postBodyField, postBody);

  // Checking if field has the text and button is not disabled
  expect(postBodyField.value).toBe(postBody);
  expect(submitButton).not.toBeDisabled();
});
