import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import { render, screen } from "../../../helpers/test-utils";
import userFixtures from "../../../helpers/fixtures/user";
import RegistrationForm from "../RegistrationForm";

const userData = userFixtures();
test("renders registration form", async () => {
  const user = userEvent.setup();
  // ARRANGE
  render(<RegistrationForm />);

  const registrationForm = screen.getByTestId("registration-form");
  expect(registrationForm).toBeInTheDocument();

  const firstNameField = screen.getByTestId("firstName-field");
  expect(firstNameField).toBeInTheDocument();

  const lastNameField = screen.getByTestId("lastName-field");
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
  const password = faker.lorem.slug(2);
  await user.type(firstNameField, userData.first_name);
  await user.type(lastNameField, userData.last_name);
  await user.type(usernameField, userData.username);
  await user.type(emailField, userData.email);
  await user.type(passwordField, password);
  await user.type(bioField, userData.bio);

  // ASSERT
  expect(firstNameField.value).toBe(userData.first_name);
  expect(lastNameField.value).toBe(userData.last_name);
  expect(usernameField.value).toBe(userData.username);
  expect(emailField.value).toBe(userData.email);
  expect(passwordField.value).toBe(password);
  expect(bioField.value).toBe(userData.bio);
});
