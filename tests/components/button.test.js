import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import Button from "../../components/Button/Button"

describe("<Button />", () => {
  const testText = "button-text";

  it ("should render button text", () => {;
    const { getByText } = render(
      <Button text={testText} />
    );

    const buttonText = getByText(testText);

    expect(buttonText).not.toBeNull();
  });

  it ("should press button", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button text={testText} handleClick={onPressMock} />
    );

    fireEvent.press(getByText(testText));
    expect(onPressMock).toHaveBeenCalled();
  });
});
