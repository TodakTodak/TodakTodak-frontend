import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { AntDesign } from "@expo/vector-icons";

import Button from "../../components/Button/Button";

import { TEST_ID, TEST_TEXT } from "../../constants/testCotents";

describe("<Button />", () => {
  it("should render button text", () => {
    const { getByText } = render(
      <Button text={TEST_TEXT} />
    );
    const buttonText = getByText(TEST_TEXT);

    expect(buttonText).toBeTruthy();
  });

  it("should press button", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button text={TEST_TEXT} handleClick={onPressMock} />
    );

    fireEvent.press(getByText(TEST_TEXT));
    expect(onPressMock).toHaveBeenCalled();
  });
});
