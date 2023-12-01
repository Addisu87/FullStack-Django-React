import { faker } from "@faker-js/faker";
import { cleanup, render, screen } from "../../../helpers/test-utils";
import userFixtures from "../../../helpers/fixtures/user";
import LoginForm from "../LoginForm";

const userData = userFixtures();

// Clean up after each test
afterEach(() => {
  cleanup();
});

test("renders Login form", async () => {
  // ARRANGE
  const { user } = render(<LoginForm />);

  const loginForm = screen.getByTestId("login-form");
  expect(loginForm).toBeInTheDocument();

  const usernameField = screen.getByTestId("username-field");
  expect(usernameField).toBeInTheDocument();

  const passwordField = screen.getByTestId("password-field");
  expect(passwordField).toBeInTheDocument();

  // ACT
  const password = faker.internet.password();
  await user.type(usernameField, userData.username);
  await user.type(passwordField, password);

  // ASSERT
  expect(usernameField.value).toBe(userData.username);
  expect(passwordField.value).toBe(password);
});
