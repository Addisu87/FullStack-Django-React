import { faker } from "@faker-js/faker";
import { cleanup, render, screen } from "../../../helpers/test-utils";
import userFixtures from "../../../helpers/fixtures/user";
import RegistrationForm from "../RegistrationForm";

const userData = userFixtures();

// Clean up after each test
afterEach(() => {
  cleanup();
});

test("renders registration form", async () => {
  // ARRANGE
  const { user } = render(<RegistrationForm />);

  const registrationForm = screen.getByTestId("registration-form");
  expect(registrationForm).toBeInTheDocument();

  const firstNameField = screen.getByTestId("first-name-field");
  expect(firstNameField).toBeInTheDocument();

  const lastNameField = screen.getByTestId("last-name-field");
  expect(lastNameField).toBeInTheDocument();

  const usernameField = screen.getByTestId("username-field");
  expect(usernameField).toBeInTheDocument();

  const emailField = screen.getByTestId("email-field");
  expect(emailField).toBeInTheDocument();

  const passwordField = screen.getByTestId("password-field");
  expect(passwordField).toBeInTheDocument();

  const bioField = screen.getByTestId("bio-field");
  expect(bioField).toBeInTheDocument();

  // ACT
  await user.type(firstNameField, userData.first_name);
  // ASSERT
  expect(firstNameField.value).toBe(userData.first_name);

  await user.type(lastNameField, userData.last_name);
  expect(lastNameField.value).toBe(userData.last_name);

  await user.type(usernameField, userData.username);
  expect(usernameField.value).toBe(userData.username);

  await user.type(emailField, userData.email);
  expect(emailField.value).toBe(userData.email);

  const password = faker.internet.password();
  await user.type(passwordField, password);
  expect(passwordField.value).toBe(password);

  await user.type(bioField, userData.bio);
  expect(bioField.value).toBe(userData.bio);
});
