import commentFixtures from "../../../helpers/fixtures/comment";
import userFixtures from "../../../helpers/fixtures/user";
import { render, screen } from "../../../helpers/test-utils";
import { setAuthTokens } from "../../../redux/authSlice";
import Comment from "../Comment";

const userData = userFixtures();
const commentData = commentFixtures(true, false, userData);

beforeEach(() => {
  jest.clearAllMocks();

  setAuthTokens({
    user: userData,
    access: null,
    refresh: null,
  });
});

test("render Comment component", () => {
  render(<Comment comment={commentData} />);

  const commentElement = screen.getByTestId("comment-test");
  expect(commentElement).toBeInTheDocument();
});
