import { BrowserRouter } from "react-router-dom";
import TestRenderer from "react-test-renderer";
import ProfileCard from "../ProfileCard";

const userData = {
  id: "0590cd67-eacd-4299-8413-605bd547ea17",
  first_name: "Addisu",
  last_name: "Tedla",
  name: "Addisu Tedla",
  post_count: 3,
  email: "Addisu@gmail.com",
  bio: "I have a knack for full-stack website development",
  username: "AddisuTedla",
  avatar: null,
  created: "2023-12-19T17:31:03.310Z",
  updated: "2023-12-20T07:38:47.631Z",
};

test("Profile card snapshot", () => {
  const profileCardDomTree = TestRenderer.create(
    <BrowserRouter>
      <ProfileCard user={userData} />
    </BrowserRouter>
  ).toJSON();
  expect(profileCardDomTree).toMatchSnapshot();
});
