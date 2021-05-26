import React from "react";
import { render } from "@testing-library/react-native";

import Category from "../../components/Category/Category";

describe("<Category />", () => {
  const testText = "category-title";

  it("should render category title", () => {
    const { getByText } = render(
      <Category title={testText} />
    );

    const CategoryText = getByText(testText);

    expect(CategoryText).not.toBeNull();
  });
});
