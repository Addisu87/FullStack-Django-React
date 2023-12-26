import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";

import { cleanup, render, screen } from "../../../helpers/test-utils";
import postFixtures from "../../../helpers/fixtures/post";
import userFixtures from "../../../helpers/fixtures/user";
import UpdatePost from "../UpdatePost";

const userData = userFixtures();
const postData = postFixtures(true, false, userData);

// Clean up after each test
afterEach(() => {
  cleanup();
});

test("Render UpdatePost component", async () => {
  const user = userEvent.setup();
  render(<UpdatePost post={postData} />);

  //Clicking to show modal
  const showModalForm = screen.getByTestId("show-modal-form");
  expect(showModalForm).toBeInTheDocument();
  user.click(showModalForm);

  const updateFormElement = screen.getByTestId("update-post-form");
  expect(updateFormElement).toBeInTheDocument();

  const postBodyField = screen.getByTestId("post-body-field");
  expect(postBodyField).toBeInTheDocument();

  const submitButton = screen.getByTestId("update-post-submit");
  expect(submitButton).toBeInTheDocument();

  const postBody = faker.lorem.sentence(10);
  await user.type(postBodyField, postBody);

  // Checking if field has the text and button is not disabled
  expect(postBodyField.value).toBe(postData.body + postBody);
  expect(submitButton).not.toBeDisabled();
});
