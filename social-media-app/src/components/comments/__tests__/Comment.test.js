import postFixtures from "../../../helpers/fixtures/post";
import userFixtures from "../../../helpers/fixtures/user";
import { render } from "../../../helpers/test-utils";
import Comment from "../Comment";

const user = userFixtures();
const post = postFixtures();
const commentData = (true, false, user, post);

test("render Comment component", () => {
  render(<Comment comment={commentData} />);
});
