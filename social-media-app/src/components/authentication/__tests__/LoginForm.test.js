import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";
import { render, screen } from "../../../helpers/test-utils";
import userFixtures from "../../../helpers/fixtures/user";

const userData = userFixtures();

describe("Jest Snapshot testing suite for login form", () => {
  test("renders Login form", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(<LoginForm />);

    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();

    const usernameField = screen.getByTestId("username-field");
    expect(usernameField).toBeInTheDocument();

    const passwordField = screen.getByTestId("password-field");
    expect(passwordField).toBeInTheDocument();

    // ACT
    const password = faker.lorem.slug(2);
    await user.type(usernameField, userData.username);
    await user.type(passwordField, password);

    // ASSERT
    expect(usernameField.value).toBe(userData.username);
    expect(passwordField.value).toBe(password);
  });
});
