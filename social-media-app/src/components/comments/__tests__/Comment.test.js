import postFixtures from "../../../helpers/fixtures/post";
import userFixtures from "../../../helpers/fixtures/user";
import { render, screen } from "../../../helpers/test-utils";
import Comment from "../Comment";

const user = userFixtures();
const post = postFixtures();
const commentData = (true, false, user, post);

test("render Comment component", () => {
  render(<Comment comment={commentData} />);

  const commentElement = screen.getByTestId("comment-test");
  expect(commentElement).toBeInTheDocument();
});
