import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

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

describe("Jest Snapshot testing suite", () => {
  it("Profile card snapshot", () => {
    const { container } = render(
      <BrowserRouter>
        <ProfileCard user={userData} />
      </BrowserRouter>
    ).toJSON();

    expect(container.innerHTML).toMatchSnapshot();
  });
});
