import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import AlertModal from "../../components/AlertModal/AlertModal";

describe("<AlertModal />", () => {
  const testText = "modal-text";

  it("should render AlertModal text", () => {
    const { getByText } = render(
      <AlertModal message={testText} />
    );
    const AlertModalText = getByText(testText);

    expect(AlertModalText).not.toBeNull();
  });

  it("should press modal closingButton", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <AlertModal message={testText} handleModalClose={onPressMock} />
    );

    fireEvent.press(getByText("닫기"));
    expect(onPressMock).toHaveBeenCalled();
  });
});
