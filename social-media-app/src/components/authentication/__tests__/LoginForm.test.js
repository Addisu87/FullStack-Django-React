import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import { render, screen } from "../../../helpers/test-utils";
import LoginForm from "../LoginForm";
import userFixtures from "../../../helpers/fixtures/user";

const userData = userFixtures();
test("renders Login form", async () => {
  const user = userEvent.setup();
  const password = faker.lorem.slug(2);
  // ARRANGE
  render(<LoginForm />);
  const loginForm = screen.getByTestId("login-form");
  expect(loginForm).toBeInTheDocument();

  const usernameField = screen.getByTestId("username-field");
  expect(usernameField).toBeInTheDocument();

  const passwordField = screen.getByTestId("password-field");
  expect(passwordField).toBeInTheDocument();

  // ACT
  await user.type(usernameField, userData.username);
  await user.type(passwordField, userData.password);

  // ASSERT
  expect(usernameField.value).toBe(userData.username);
  expect(passwordField.value).toBe(userData.password);
});
