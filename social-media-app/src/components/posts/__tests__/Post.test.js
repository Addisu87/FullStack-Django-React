import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Post from "../Post";
import userFixtures from "../../../helpers/fixtures/user";
import postFixtures from "../../../helpers/fixtures/post";
import { setAuthTokens } from "../../../redux/authSlice";

const userData = userFixtures();
const postData = postFixtures(true, false, userData);

beforeEach(() => {
  // Cleans up the DOM after each test
  cleanup();
  // to fully reset the state between __tests__, clear the storage
  localStorage.clear();
  // and reset all mocks
  jest.clearAllMocks();

  setAuthTokens({ user: userData, access: null, refresh: null });
});

test("render Post component", () => {
  render(<Post post={postData} />);

  const postElement = screen.getByTestId("post-test");
  expect(postElement).toBeInTheDocument();
});
