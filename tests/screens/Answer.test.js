import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react-native";

import store from "../../redux/store";

import Answer from "../../screens/Answer/Answer";

import { TEST_ID } from "../../constants/testContents";

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn()
    })
  };
});

const mockCommentInfo = {
  content: "test comment",
  user: "test@test.com",
  nickname: "test user",
  post: "testID",
  createdAt: Date.now(),
  likes: ["testUser2"]
};

describe("<Answer />", () => {
  it("should rendering based on the received information", (done) => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Answer route={{
          params: {
            commentInfo: mockCommentInfo,
            postId: "testId"
          }
        }} />
      </Provider>
    );

    const answerTitle = getByText(`${mockCommentInfo.nickname}님의 답변`);
    const answerLikeButtonText = getByText("쓰담 쓰담");
    const answerPostRouteButtonText = getByText("게시물로");
    const answerComment = getByTestId(TEST_ID);

    expect(answerTitle).not.toBeNull();
    expect(answerLikeButtonText).not.toBeNull();
    expect(answerComment.props.value).toBe("test comment");
    expect(answerPostRouteButtonText).not.toBeNull();
    done();
  });
});
